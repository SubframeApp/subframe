import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { type BrowserContext, chromium, type LaunchOptions, type Page } from "playwright-core"
import XDGAppPaths from "xdg-app-paths"
import type { CaptureDocumentResult, StyleSheetText } from "./api-types"
import { CaptureError } from "./errors"

const NAVIGATION_TIMEOUT_MS = 30_000
const NETWORK_IDLE_TIMEOUT_MS = 3_000
const FONTS_READY_TIMEOUT_MS = 5_000
const SETTLE_MS = 500

const SECURE_CONTEXT_HOSTNAMES = ["localhost", "127.0.0.1", "[::1]"]

export function parseCaptureUrl(rawUrl: string): URL {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    throw new CaptureError(
      `"${rawUrl}" is not a valid URL. Include the scheme, for example http://localhost:3000.`,
      "invalid-url",
    )
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new CaptureError(`Only http and https pages can be captured, not ${url.protocol}`, "invalid-url")
  }
  return url
}

/**
 * The capture script needs crypto.subtle, which Chrome only exposes in secure contexts. Plain http on a
 * LAN host isn't one, so Chrome is told to treat that origin as secure.
 */
export function chromeLaunchArgs(url: URL): string[] {
  const isInsecureRemote = url.protocol === "http:" && !SECURE_CONTEXT_HOSTNAMES.includes(url.hostname)
  return isInsecureRemote ? [`--unsafely-treat-insecure-origin-as-secure=${url.origin}`] : []
}

/** Cloud sandboxes and CI boxes run Linux with no X or Wayland server, where a headed Chrome exits at launch. */
export function hasDisplay(platform: NodeJS.Platform, env: NodeJS.ProcessEnv): boolean {
  if (platform === "darwin" || platform === "win32") {
    return true
  }
  return Boolean(env.DISPLAY || env.WAYLAND_DISPLAY)
}

/** Chrome follows the OS proxy settings, not these variables; sandboxes that only allow egress through a proxy set just the variables. */
export function chromeProxy(env: NodeJS.ProcessEnv): LaunchOptions["proxy"] {
  const server = env.HTTPS_PROXY || env.https_proxy || env.HTTP_PROXY || env.http_proxy
  if (!server) {
    return undefined
  }
  const bypass = env.NO_PROXY || env.no_proxy
  return bypass ? { server, bypass } : { server }
}

/** Resolved from the working directory and returned as a file: URL, because import() takes URLs, not Windows paths. */
export function stepsFileUrl(stepsPath: string, cwd: string): string {
  return pathToFileURL(resolve(cwd, stepsPath)).href
}

function firstLine(err: unknown): string {
  return (err instanceof Error ? err.message : String(err)).split("\n")[0]
}

export async function launchCaptureBrowser(url: URL, { headless }: { headless: boolean }): Promise<BrowserContext> {
  const profileDir = join(XDGAppPaths("com.subframe.cli").dataDirs()[0], "capture-profile")
  const proxy = chromeProxy(process.env)
  try {
    return await chromium.launchPersistentContext(profileDir, {
      channel: "chrome",
      headless,
      viewport: { width: 1440, height: 900 },
      // The capture script fetches the page's fonts and images, which a strict connect-src would block.
      bypassCSP: true,
      args: chromeLaunchArgs(url),
      ...(proxy !== undefined && { proxy }),
    })
  } catch (err) {
    throw new CaptureError(
      `Could not start Google Chrome. Install Google Chrome, and close any other window that capture opened. (${firstLine(
        err,
      )})`,
      "chrome-launch",
    )
  }
}

// Bounded on purpose: pages with long-polling or analytics never go network-idle.
async function settle(page: Page) {
  // A stalled font must not hang the command with the profile still locked.
  await Promise.race([
    page.evaluate(() => document.fonts.ready).catch(() => {}),
    page.waitForTimeout(FONTS_READY_TIMEOUT_MS),
  ])
  await page.waitForLoadState("networkidle", { timeout: NETWORK_IDLE_TIMEOUT_MS }).catch(() => {})
  await page.waitForTimeout(SETTLE_MS)
}

export async function openPage(context: BrowserContext, url: URL): Promise<Page> {
  const page = context.pages()[0] ?? (await context.newPage())
  try {
    await page.goto(url.href, { waitUntil: "load", timeout: NAVIGATION_TIMEOUT_MS })
  } catch (err) {
    throw new CaptureError(`Could not open ${url.href}. Is the app running? (${firstLine(err)})`, "navigation")
  }
  await settle(page)
  return page
}

export async function runStepsFile(page: Page, stepsPath: string, cwd: string) {
  const fileUrl = stepsFileUrl(stepsPath, cwd)
  let steps: unknown
  try {
    // The steps file is the user's, loaded at runtime from a path only known then.
    steps = (await import(fileUrl)).default
  } catch (err) {
    throw new CaptureError(`Could not load the steps file ${stepsPath}: ${firstLine(err)}`, "steps")
  }
  if (typeof steps !== "function") {
    throw new CaptureError(
      `The steps file ${stepsPath} must default-export a function that takes the Playwright page.`,
      "steps",
    )
  }
  try {
    await steps(page)
  } catch (err) {
    throw new CaptureError(
      `The steps file ${stepsPath} failed: ${err instanceof Error ? err.message : String(err)}`,
      "steps",
    )
  }
  await settle(page)
}

/** Resolves once the user has closed every window of the browser. */
export function waitForWindowsClosed(context: BrowserContext): Promise<void> {
  return new Promise((done) => {
    const doneIfNoPages = () => {
      if (context.pages().length === 0) {
        done()
      }
    }
    context.on("close", () => done())
    context.on("page", (page) => page.on("close", doneIfNoPages))
    for (const page of context.pages()) {
      page.on("close", doneIfNoPages)
    }
  })
}

/**
 * Reads the text of stylesheets from other origins, which the page can't read through CSSOM. The browser already
 * holds the bytes, so the capture script asks for them here instead of re-fetching what a CORS policy may refuse.
 */
export async function collectStyleSheetTexts(page: Page): Promise<StyleSheetText[]> {
  const pageOrigin = new URL(page.url()).origin
  const cdp = await page.context().newCDPSession(page)
  try {
    const sheets = new Map<string, string>()
    cdp.on("CSS.styleSheetAdded", ({ header }) => {
      if (header.sourceURL.length > 0 && header.isConstructed !== true) {
        sheets.set(header.styleSheetId, header.sourceURL)
      }
    })
    // CSS.enable announces every sheet the document already holds before it returns.
    await cdp.send("DOM.enable")
    await cdp.send("CSS.enable")

    const texts: StyleSheetText[] = []
    for (const [styleSheetId, href] of sheets) {
      // An inline sheet's sourceURL is a sourceURL comment, not an address.
      if (!URL.canParse(href) || new URL(href).origin === pageOrigin) {
        continue
      }
      try {
        const { text } = await cdp.send("CSS.getStyleSheetText", { styleSheetId })
        texts.push({ href, text })
      } catch {
        // Removed between the announcement and this call.
      }
    }
    return texts
  } finally {
    await cdp.detach().catch(() => {})
  }
}

export async function captureDocument(page: Page, scriptText: string, styleSheetTexts: StyleSheetText[]) {
  // Runtime.evaluate, which a page's CSP doesn't apply to, unlike a script tag.
  await page.evaluate(scriptText)
  return page.evaluate(
    (texts) =>
      (
        window as unknown as {
          __subframeCapture: { captureDocument(options: { styleSheetTexts: StyleSheetText[] }): Promise<unknown> }
        }
      ).__subframeCapture.captureDocument({ styleSheetTexts: texts }),
    styleSheetTexts,
  ) as Promise<CaptureDocumentResult>
}
