import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { type Browser, type BrowserContext, chromium, type LaunchOptions, type Page } from "playwright-core"
import { SUBFRAME_DIRECTORY } from "./config"
import { CaptureError } from "./errors"

const NAVIGATION_TIMEOUT_MS = 30_000
const NETWORK_IDLE_TIMEOUT_MS = 3_000
const FONTS_READY_TIMEOUT_MS = 5_000
const SETTLE_MS = 500

const SECURE_CONTEXT_HOSTNAMES = ["localhost", "127.0.0.1", "[::1]"]
const SCREENSHOT_JPEG_QUALITY = 80

export interface StyleSheetText {
  href: string
  text: string
}

// What window.__subframeCapture.captureDocument resolves to once /capture/capture.js is evaluated in a page.
export interface CaptureDocumentResult {
  artifact: unknown
  jsx: string
  hasOwnHeight: boolean
  url: string
  title: string
}

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
function stepsFileUrl(stepsPath: string, cwd: string): string {
  return pathToFileURL(resolve(cwd, stepsPath)).href
}

function firstLine(err: unknown): string {
  return (err instanceof Error ? err.message : String(err)).split("\n")[0]
}

export async function launchCaptureBrowser(url: URL, { headless }: { headless: boolean }): Promise<BrowserContext> {
  const profileDir = join(SUBFRAME_DIRECTORY, "capture-profile")
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

/**
 * Attaches to a Chrome the user or their agent already has open. Such a browser was started without bypassCSP, and
 * Chrome only applies that when a document loads, so on a page whose connect-src blocks the capture script's fetches
 * its fonts and private-network images come out missing.
 */
export async function connectCaptureBrowser(endpoint: string): Promise<Browser> {
  try {
    return await chromium.connectOverCDP(endpoint)
  } catch (err) {
    throw new CaptureError(
      `Could not attach to a browser at ${endpoint}. Start Chrome with --remote-debugging-port and pass its address, such as http://localhost:9222. (${firstLine(
        err,
      )})`,
      "attach",
    )
  }
}

function isWebPage(rawUrl: string): boolean {
  return URL.canParse(rawUrl) && ["http:", "https:"].includes(new URL(rawUrl).protocol)
}

function isSameDocument(a: URL, b: URL): boolean {
  return a.origin === b.origin && a.pathname === b.pathname && a.search === b.search
}

/** The tab to capture: the only web page open, or the one showing `url`, ignoring its hash. */
export function findAttachedPage<T extends { url(): string }>(pages: readonly T[], url: URL | undefined): T {
  const webPages = pages.filter((page) => isWebPage(page.url()))
  const matches = url === undefined ? webPages : webPages.filter((page) => isSameDocument(new URL(page.url()), url))
  if (matches.length === 1) {
    return matches[0]
  }
  const openTabs = webPages.length === 0 ? "none" : webPages.map((page) => page.url()).join(", ")
  if (url === undefined) {
    throw new CaptureError(
      `Pass the URL of the tab to capture: the browser has ${webPages.length} web pages open (${openTabs}).`,
      "attach",
    )
  }
  if (matches.length === 0) {
    throw new CaptureError(`No open tab shows ${url.href}. Open tabs: ${openTabs}.`, "attach")
  }
  throw new CaptureError(`${matches.length} open tabs show ${url.href}. Close all but the one to capture.`, "attach")
}

// Bounded on purpose: pages with long-polling or analytics never go network-idle.
export async function settle(page: Page) {
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

/** A JPEG of the viewport, taken before the capture script runs so it shows the page exactly as it was. */
export async function screenshotViewport(page: Page): Promise<Buffer> {
  try {
    return await page.screenshot({ type: "jpeg", quality: SCREENSHOT_JPEG_QUALITY })
  } catch (err) {
    throw new CaptureError(`Could not take a screenshot of the page: ${firstLine(err)}`, "capture-script")
  }
}

async function injectScript(page: Page, scriptText: string) {
  const cdp = await page.context().newCDPSession(page)
  try {
    // A DevTools evaluate isn't subject to the page's CSP, unlike a script tag or page.evaluate(string), which runs eval.
    // Chrome still lets the evaluated code eval by default, so the script's zod would detect eval, compile its parsers
    // with it, and fail once they run later under the page's CSP.
    const { exceptionDetails } = await cdp.send("Runtime.evaluate", {
      expression: scriptText,
      allowUnsafeEvalBlockedByCSP: false,
    })
    if (exceptionDetails !== undefined) {
      const message = exceptionDetails.exception?.description ?? exceptionDetails.text
      throw new CaptureError(`The capture script failed to start: ${firstLine(message)}`, "capture-script")
    }
  } finally {
    await cdp.detach().catch(() => {})
  }
}

/** Also returns the downloads the page's CSP refused the capture script, which only happens in a browser that didn't turn CSP off. */
export async function captureDocument(
  page: Page,
  scriptText: string,
  styleSheetTexts: StyleSheetText[],
): Promise<{ capture: CaptureDocumentResult; blockedByCsp: string[] }> {
  await injectScript(page, scriptText)
  try {
    // No async/await in here: the CLI's bundle compiles it to a helper that doesn't exist in the page.
    return await page.evaluate((texts) => {
      const blocked: string[] = []
      const onViolation = (event: SecurityPolicyViolationEvent) => {
        if (event.effectiveDirective === "connect-src") {
          blocked.push(event.blockedURI)
        }
      }
      document.addEventListener("securitypolicyviolation", onViolation)
      return (
        window as unknown as {
          __subframeCapture: {
            captureDocument(options: { styleSheetTexts: StyleSheetText[] }): Promise<CaptureDocumentResult>
          }
        }
      ).__subframeCapture
        .captureDocument({ styleSheetTexts: texts })
        .then(
          (capture) =>
            // Violation events are dispatched as tasks, so the last ones can still be queued.
            new Promise<{ capture: CaptureDocumentResult; blockedByCsp: string[] }>((resolve) =>
              setTimeout(() => resolve({ capture, blockedByCsp: blocked }), 0),
            ),
        )
        .finally(() => document.removeEventListener("securitypolicyviolation", onViolation))
    }, styleSheetTexts)
  } catch (err) {
    throw new CaptureError(`The capture failed: ${firstLine(err)}`, "capture-script")
  }
}
