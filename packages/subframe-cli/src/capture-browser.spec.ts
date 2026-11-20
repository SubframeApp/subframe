import { mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { Page } from "playwright-core"
import { describe, expect, it, vi } from "vitest"
import { chromeLaunchArgs, chromeProxy, hasDisplay, parseCaptureUrl, runStepsFile } from "./capture-browser"
import { CaptureError } from "./errors"

// playwright-core is only touched by the launch path, which these tests never reach.
vi.mock("playwright-core", () => ({ chromium: {} }))

function launchArgsFor(url: string) {
  return chromeLaunchArgs(parseCaptureUrl(url))
}

describe("chromeLaunchArgs", () => {
  it("treats a plain-http LAN origin as secure so crypto.subtle exists", () => {
    expect(launchArgsFor("http://192.168.1.20:3000/dashboard?x=1")).toEqual([
      "--unsafely-treat-insecure-origin-as-secure=http://192.168.1.20:3000",
    ])
  })

  it.each(["http://localhost:3000", "http://127.0.0.1:5173/a", "https://192.168.1.20:3000", "https://example.com"])(
    "adds nothing for %s, which is already a secure context",
    (url) => {
      expect(launchArgsFor(url)).toEqual([])
    },
  )
})

describe("hasDisplay", () => {
  it("treats Linux with no X or Wayland server as having no display", () => {
    expect(hasDisplay("linux", {})).toBe(false)
    expect(hasDisplay("linux", { DISPLAY: "" })).toBe(false)
  })

  it("finds a display on Linux through X or Wayland", () => {
    expect(hasDisplay("linux", { DISPLAY: ":0" })).toBe(true)
    expect(hasDisplay("linux", { WAYLAND_DISPLAY: "wayland-0" })).toBe(true)
  })

  it.each(["darwin", "win32"] as const)("always has a display on %s", (platform) => {
    expect(hasDisplay(platform, {})).toBe(true)
  })
})

describe("chromeProxy", () => {
  it("uses no proxy when none is set", () => {
    expect(chromeProxy({})).toBeUndefined()
  })

  it("prefers the https proxy and passes the no-proxy list as the bypass", () => {
    expect(
      chromeProxy({
        HTTP_PROXY: "http://plain:8080",
        https_proxy: "http://127.0.0.1:43469",
        no_proxy: "localhost,registry.npmjs.org",
      }),
    ).toEqual({ server: "http://127.0.0.1:43469", bypass: "localhost,registry.npmjs.org" })
  })

  it("falls back to the http proxy", () => {
    expect(chromeProxy({ http_proxy: "http://plain:8080" })).toEqual({ server: "http://plain:8080" })
  })
})

describe("parseCaptureUrl", () => {
  it.each(["localhost:3000/x", "not a url", "file:///tmp/a.html"])("rejects %s with a CaptureError", (url) => {
    expect(() => parseCaptureUrl(url)).toThrow(CaptureError)
  })
})

describe("runStepsFile", () => {
  async function stepsDir(source: string) {
    const dir = await mkdtemp(join(tmpdir(), "subframe-steps-"))
    await writeFile(join(dir, "steps.mjs"), source)
    return dir
  }

  it("resolves the file relative to the given cwd and calls its default export with the page", async () => {
    const dir = await stepsDir(`export default async (page) => { await page.click("#open-menu") }`)
    const click = vi.fn()
    const page = {
      click,
      evaluate: vi.fn().mockResolvedValue(undefined),
      waitForLoadState: vi.fn().mockResolvedValue(undefined),
      waitForTimeout: vi.fn(),
    }

    await runStepsFile(page as unknown as Page, "steps.mjs", dir)

    expect(click).toHaveBeenCalledWith("#open-menu")
  })

  it("fails with the steps file's own message when it throws", async () => {
    const dir = await stepsDir(`export default async () => { throw new Error("no such button") }`)

    const err = await runStepsFile({} as Page, "steps.mjs", dir).catch((e) => e)

    expect(err).toBeInstanceOf(CaptureError)
    expect(err.reason).toBe("steps")
    expect(err.message).toContain("no such button")
  })

  it("fails when the default export is not a function", async () => {
    const dir = await stepsDir(`export default 42`)

    const err = await runStepsFile({} as Page, "steps.mjs", dir).catch((e) => e)

    expect(err).toMatchObject({ reason: "steps" })
  })

  it("fails when the file does not exist under the cwd", async () => {
    const dir = await mkdtemp(join(tmpdir(), "subframe-steps-"))

    const err = await runStepsFile({} as Page, "missing.mjs", dir).catch((e) => e)

    expect(err).toMatchObject({ reason: "steps" })
  })
})
