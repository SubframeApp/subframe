import { Command } from "@commander-js/extra-typings"
import { mkdir, mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { promisify } from "node:util"
import { gzip } from "node:zlib"
import { analytics } from "./analytics"
import { apiFetchCaptureScript } from "./api-endpoints"
import type { CaptureDocumentResult } from "./api-types"
import {
  captureDocument,
  collectStyleSheetTexts,
  hasDisplay,
  launchCaptureBrowser,
  openPage,
  parseCaptureUrl,
  runStepsFile,
  waitForWindowsClosed,
} from "./capture-browser"
import { cwd } from "./common"
import { CaptureError, CaptureFailureReason } from "./errors"
import { log } from "./log"
import { runCommand } from "./run-command"

const gzipAsync = promisify(gzip)

// The server's per-file cap on staged uploads.
const MAX_CAPTURE_BYTES = 10 * 1024 * 1024

export async function writeCaptureFile(capture: CaptureDocumentResult, out: string | undefined): Promise<string> {
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

function trackFailure(err: unknown) {
  const reason: CaptureFailureReason | "other" = err instanceof CaptureError ? err.reason : "other"
  analytics.trackEvent({ type: "cli:capture-failed", reason })
}

export const captureCommand = new Command()
  .name("capture")
  .description(
    "captures a page of your running app into a file that the Subframe MCP tools import as an editable page (upload it with create_asset_upload, then import_capture)",
  )
  .argument("<url>", "the page to capture, such as http://localhost:3000")
  .option(
    "--steps <file>",
    "a module whose default export takes the Playwright page and puts it in the state to capture",
  )
  .option("--preview", "save a screenshot of the page to a temp file and stop, without capturing")
  .option("--out <path>", "where to write the capture file (defaults to a new temp directory)")
  .option("--login", "open the page and wait for you to close the window, so you can sign in once")
  .action(async (rawUrl, opts) =>
    runCommand("capture", async () => {
      try {
        const url = parseCaptureUrl(rawUrl)
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
          if (opts.steps !== undefined) {
            await runStepsFile(page, opts.steps, cwd)
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
            log.warn("Capture script could not be loaded")
            throw new CaptureError(err instanceof Error ? err.message : String(err), "capture-script")
          }
          const styleSheetTexts = await collectStyleSheetTexts(page)
          const capture = await captureDocument(page, scriptText, styleSheetTexts)
          const path = await writeCaptureFile(capture, opts.out)
          analytics.trackEvent({ type: "cli:capture-succeeded" })
          console.log(path)
          console.log(
            "Next: upload this file with the Subframe create_asset_upload tool, then import it with import_capture.",
          )
          return { path }
        } finally {
          await context.close().catch(() => {})
        }
      } catch (err) {
        trackFailure(err)
        throw err
      }
    }),
  )
