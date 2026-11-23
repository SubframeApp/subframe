import { Command } from "@commander-js/extra-typings"
import { mkdir, mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { promisify } from "node:util"
import { gzip } from "node:zlib"
import type { Page } from "playwright-core"
import { analytics } from "./analytics"
import { apiFetchCaptureScript } from "./api-endpoints"
import {
  captureDocument,
  type CaptureDocumentResult,
  collectStyleSheetTexts,
  connectCaptureBrowser,
  findAttachedPage,
  hasDisplay,
  launchCaptureBrowser,
  openPage,
  parseCaptureUrl,
  runStepsFile,
  screenshotViewport,
  settle,
  waitForWindowsClosed,
} from "./capture-browser"
import { cwd } from "./common"
import { CaptureError, CaptureFailureReason } from "./errors"
import { warning } from "./output/format"
import { runCommand } from "./run-command"

const gzipAsync = promisify(gzip)

// The server's per-file cap on staged uploads.
const MAX_CAPTURE_BYTES = 10 * 1024 * 1024

// The one file the CLI writes, gzipped, for the agent to upload: the capture script's result plus the CLI's own screenshot.
export interface CaptureFile extends CaptureDocumentResult {
  // A JPEG of the viewport just before the capture, for Subframe's capture review to compare the live page against.
  screenshotJpegBase64: string
}

export async function writeCaptureFile(capture: CaptureFile, out: string | undefined): Promise<string> {
  const zipped = await gzipAsync(JSON.stringify(capture))
  if (zipped.length > MAX_CAPTURE_BYTES) {
    throw new CaptureError(
      `This page is too large to import: its capture is ${Math.ceil(
        zipped.length / 1024 / 1024,
      )} MB compressed and Subframe takes at most ${
        MAX_CAPTURE_BYTES / 1024 / 1024
      } MB. Capture a smaller page, or a state of it with less content.`,
      "too-large",
    )
  }
  const outPath =
    out === undefined ? join(await mkdtemp(join(tmpdir(), "subframe-capture-")), "capture.json.gz") : resolve(cwd, out)
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, zipped)
  return outPath
}

// Closing the window or tab mid-capture is the user's doing, so it isn't reported as a CLI bug.
function pageClosedError(): CaptureError {
  return new CaptureError(
    "The page closed before the capture finished. Leave it open until the command prints the capture file's path.",
    "page-closed",
  )
}

function trackFailure(err: unknown) {
  const reason: CaptureFailureReason | "other" = err instanceof CaptureError ? err.reason : "other"
  analytics.trackEvent({ type: "cli:capture-failed", reason })
}

type CaptureOptions = { steps?: string; preview?: boolean; out?: string }

async function captureFromPage(page: Page, opts: CaptureOptions): Promise<Record<string, unknown>> {
  if (opts.steps !== undefined) {
    await runStepsFile(page, opts.steps, cwd)
    await settle(page)
  }

  if (opts.preview) {
    const previewPath = join(await mkdtemp(join(tmpdir(), "subframe-capture-")), "preview.png")
    await page.screenshot({ path: previewPath, fullPage: true })
    console.log(previewPath)
    return { previewPath }
  }

  let scriptText: string
  try {
    scriptText = await apiFetchCaptureScript()
  } catch (err) {
    throw new CaptureError(err instanceof Error ? err.message : String(err), "capture-script")
  }
  const styleSheetTexts = await collectStyleSheetTexts(page)
  const screenshot = await screenshotViewport(page)
  const { capture, blockedByCsp } = await captureDocument(page, scriptText, styleSheetTexts)
  if (blockedByCsp.length > 0) {
    console.warn(
      warning(
        `The page's Content Security Policy blocked ${
          blockedByCsp.length
        } downloads, so they are missing from the capture and its fonts may fall back to defaults: ${blockedByCsp
          .slice(0, 3)
          .join(", ")}. To keep them, capture without --cdp, reaching the same state with --steps.`,
      ),
    )
  }
  const path = await writeCaptureFile({ ...capture, screenshotJpegBase64: screenshot.toString("base64") }, opts.out)
  analytics.trackEvent({ type: "cli:capture-succeeded" })
  console.log(path)
  console.log("Next: upload this file with the Subframe create_asset_upload tool, then import it with import_capture.")
  return { path, blockedByCsp }
}

async function captureInOwnBrowser(url: URL, opts: CaptureOptions & { login?: boolean }) {
  const headless = !hasDisplay(process.platform, process.env)
  if (opts.login && headless) {
    throw new CaptureError(
      "--login needs a screen to sign in on, and this machine has none. Sign in from a --steps file instead.",
      "no-display",
    )
  }
  const context = await launchCaptureBrowser(url, { headless })
  try {
    if (opts.login) {
      await openPage(context, url)
      console.log("Sign in in the browser window, then close it. Subframe keeps the session for later captures.")
      await waitForWindowsClosed(context)
      return {}
    }
    const page = await openPage(context, url)
    return await captureFromPage(page, opts)
  } catch (err) {
    throw context.pages().length === 0 ? pageClosedError() : err
  } finally {
    await context.close().catch(() => {})
  }
}

async function captureAttachedTab(endpoint: string, url: URL | undefined, opts: CaptureOptions) {
  const browser = await connectCaptureBrowser(endpoint)
  try {
    const pages = browser.contexts().flatMap((context) => context.pages())
    const page = findAttachedPage(pages, url)
    try {
      await settle(page)
      return await captureFromPage(page, opts)
    } catch (err) {
      throw page.isClosed() ? pageClosedError() : err
    }
  } finally {
    // Only disconnects: the browser and its tabs stay open.
    await browser.close().catch(() => {})
  }
}

export const captureCommand = new Command()
  .name("capture")
  .description(
    "captures a page of your running app into a file that the Subframe MCP tools import as an editable page (upload it with create_asset_upload, then import_capture)",
  )
  .argument("[url]", "the page to capture, such as http://localhost:3000")
  .option(
    "--steps <file>",
    "a module whose default export takes the Playwright page and puts it in the state to capture",
  )
  .option("--preview", "save a screenshot of the page to a temp file and stop, without capturing")
  .option("--out <path>", "where to write the capture file (defaults to a new temp directory)")
  .option("--login", "open the page and wait for you to close the window, so you can sign in once")
  .option(
    "--cdp <endpoint>",
    "capture a tab of a Chrome that is already open, as it is, through its remote debugging address (such as http://localhost:9222); <url> picks the tab when several are open",
  )
  .action(async (rawUrl, opts) =>
    runCommand("capture", async () => {
      try {
        const url = rawUrl === undefined ? undefined : parseCaptureUrl(rawUrl)
        if (opts.cdp !== undefined) {
          if (opts.login) {
            throw new CaptureError(
              "--login signs in to Subframe's own browser. Sign in in the browser you attach to.",
              "invalid-options",
            )
          }
          return await captureAttachedTab(opts.cdp, url, opts)
        }
        if (url === undefined) {
          throw new CaptureError("Pass the URL of the page to capture, such as http://localhost:3000.", "invalid-url")
        }
        return await captureInOwnBrowser(url, opts)
      } catch (err) {
        trackFailure(err)
        throw err
      }
    }),
  )
