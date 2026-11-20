import { randomBytes } from "node:crypto"
import { mkdtemp, readFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { basename, dirname, join } from "node:path"
import { gunzipSync } from "node:zlib"
import { describe, expect, it, vi } from "vitest"
import { type CaptureFile, writeCaptureFile } from "./capture"
import { CaptureError } from "./errors"

vi.mock("./log", () => ({ log: { warn: vi.fn(), error: vi.fn() } }))
vi.mock("playwright-core", () => ({ chromium: {} }))

const capture: CaptureFile = {
  artifact: { version: 3, nodes: ["a"] },
  jsx: "<div>hello</div>",
  hasOwnHeight: true,
  url: "http://localhost:3000/settings",
  title: "Settings",
  screenshotJpegBase64: "/9j/2w==",
}

describe("writeCaptureFile", () => {
  it("writes the capture as gzipped JSON to --out", async () => {
    const out = join(await mkdtemp(join(tmpdir(), "capture-spec-")), "nested", "page.json.gz")

    const path = await writeCaptureFile(capture, out)

    expect(path).toBe(out)
    expect(JSON.parse(gunzipSync(await readFile(path)).toString())).toEqual(capture)
  })

  it("defaults to capture.json.gz in a new temp directory", async () => {
    const path = await writeCaptureFile(capture, undefined)

    expect(basename(path)).toBe("capture.json.gz")
    expect(basename(dirname(path))).toMatch(/^subframe-capture-/)
    expect(JSON.parse(gunzipSync(await readFile(path)).toString())).toEqual(capture)
  })

  it("refuses a capture whose gzip exceeds 10 MB", async () => {
    // Base64 of random bytes gzips to about 75%, which stays above the cap.
    const big = { ...capture, jsx: randomBytes(16 * 1024 * 1024).toString("base64") }

    const err = await writeCaptureFile(big, undefined).catch((e) => e)

    expect(err).toBeInstanceOf(CaptureError)
    expect(err).toMatchObject({ reason: "too-large" })
    expect(err.message).toContain("too large to import")
  })
})
