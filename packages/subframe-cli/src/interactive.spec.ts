import { afterEach, describe, expect, it, vi } from "vitest"
import { ask, isNonInteractive, NonInteractiveError } from "./interactive"

// Under vitest, process.stdin.isTTY is undefined, so isNonInteractive() is true.
// These tests therefore exercise the non-interactive code paths of ask().

describe("isNonInteractive", () => {
  it("is true when stdin is not a TTY (the test environment)", () => {
    expect(isNonInteractive()).toBe(true)
  })
})

describe("ask (non-interactive)", () => {
  it("returns an explicit override without prompting", async () => {
    const value = await ask<string>(
      { type: "text", name: "dir", message: "dir?", initial: "./src" },
      { override: "./custom" },
    )
    expect(value).toBe("./custom")
  })

  it("returns false as an override (override of a falsy value still wins)", async () => {
    const value = await ask<boolean>(
      { type: "confirm", name: "install", message: "install?", initial: true },
      { override: false },
    )
    expect(value).toBe(false)
  })

  it("falls back to a confirm's default when no override is given", async () => {
    const value = await ask<boolean>({ type: "confirm", name: "install", message: "install?", initial: true })
    expect(value).toBe(true)
  })

  it("falls back to a select's default choice value", async () => {
    const value = await ask<string>({
      type: "select",
      name: "cssType",
      message: "which?",
      initial: 1,
      choices: [
        { title: "v3", value: "tailwind" },
        { title: "v4", value: "tailwind-v4" },
      ],
    })
    expect(value).toBe("tailwind-v4")
  })

  it("applies a text default's format function", async () => {
    const value = await ask<string>({
      type: "text",
      name: "name",
      message: "name?",
      initial: "  my-app  ",
      format: (v: string) => v.trim(),
    })
    expect(value).toBe("my-app")
  })

  it("throws NonInteractiveError when required and no override is provided", async () => {
    await expect(
      ask<string>(
        { type: "text", name: "name", message: "name?", initial: "my-app" },
        { required: true, requiredHint: "Pass --name <name>." },
      ),
    ).rejects.toBeInstanceOf(NonInteractiveError)
  })

  it("throws when there is no default and no override", async () => {
    await expect(ask<string>({ type: "text", name: "token", message: "token?" })).rejects.toBeInstanceOf(
      NonInteractiveError,
    )
  })

  it("validates the default and throws the validation message when it fails", async () => {
    await expect(
      ask<string>({
        type: "text",
        name: "dir",
        message: "dir?",
        initial: "./does-not-exist",
        validate: (v: string) => (v === "./src" ? true : `Directory ${v} does not exist`),
      }),
    ).rejects.toThrow("Directory ./does-not-exist does not exist")
  })

  it("validates an override and throws when it fails (no longer accepted as-is)", async () => {
    await expect(
      ask<string>(
        {
          type: "text",
          name: "alias",
          message: "alias?",
          validate: (v: string) => (v.endsWith("/*") ? true : "Alias must end with '/*'"),
        },
        { override: "@/ui" },
      ),
    ).rejects.toThrow("Alias must end with '/*'")
  })

  it("formats an override the way an interactive answer would be (e.g. trims)", async () => {
    const value = await ask<string>(
      { type: "text", name: "name", message: "name?", format: (v: string) => v.trim() },
      { override: "  my-app  " },
    )
    expect(value).toBe("my-app")
  })
})

describe("ask (strict mode, --non-interactive)", () => {
  afterEach(() => {
    vi.resetModules()
    vi.doUnmock("./flags")
  })

  it("refuses to fall back to a default and fails fast", async () => {
    vi.resetModules()
    vi.doMock("./flags", () => ({ flagYes: false, flagNonInteractive: true, flagJson: false }))
    const { ask: strictAsk, NonInteractiveError: StrictError } = await import("./interactive")

    await expect(
      strictAsk<boolean>(
        { type: "confirm", name: "install", message: "install?", initial: true },
        { requiredHint: "Pass --install or --no-install." },
      ),
    ).rejects.toBeInstanceOf(StrictError)
  })

  it("still honors an explicit override in strict mode", async () => {
    vi.resetModules()
    vi.doMock("./flags", () => ({ flagYes: false, flagNonInteractive: true, flagJson: false }))
    const { ask: strictAsk } = await import("./interactive")

    const value = await strictAsk<boolean>(
      { type: "confirm", name: "install", message: "install?", initial: true },
      { override: false },
    )
    expect(value).toBe(false)
  })
})
