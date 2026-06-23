import { describe, expect, it } from "vitest"
import { makeProjectDir, runCli } from "./harness"

// These don't touch the backend, so no mock server is needed.

describe("global behavior", () => {
  it("--version prints the version and exits 0", async () => {
    const result = await runCli(["--version"], { cwd: makeProjectDir() })

    expect(result.exitCode).toBe(0)
    expect(result.stdout).toMatch(/\d+\.\d+\.\d+/)
  })

  it("--help lists the commands", async () => {
    const result = await runCli(["--help"], { cwd: makeProjectDir() })

    expect(result.exitCode).toBe(0)
    expect(result.stdout).toMatch(/init/)
    expect(result.stdout).toMatch(/sync/)
    expect(result.stdout).toMatch(/push-component/)
    expect(result.stdout).toMatch(/import/)
  })

  it("surfaces the non-interactive flags in help", async () => {
    const result = await runCli(["--help"], { cwd: makeProjectDir() })

    expect(result.stdout).toMatch(/--yes/)
    expect(result.stdout).toMatch(/--non-interactive/)
    expect(result.stdout).toMatch(/--json/)
  })

  it("shows the negatable flags in init --help", async () => {
    const result = await runCli(["init", "--help"], { cwd: makeProjectDir() })

    expect(result.exitCode).toBe(0)
    expect(result.stdout).toMatch(/--no-install/)
    expect(result.stdout).toMatch(/--no-sync/)
    expect(result.stdout).toMatch(/--no-tailwind/)
  })

  it("exits non-zero on an unknown command", async () => {
    const result = await runCli(["frobnicate"], { cwd: makeProjectDir() })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).not.toBe(0)
  })
})
