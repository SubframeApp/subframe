import { describe, expect, it } from "vitest"
import { makeHome, makeProjectDir, PROJECT_SETTINGS, runCli, scaffoldProject, setupMockServer,TOKEN } from "./harness"

const getMock = setupMockServer()

async function initedProject() {
  const dir = makeProjectDir()
  await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"] })
  return dir
}

describe("authentication", () => {
  it("authenticates with the --auth-token flag (no env var)", async () => {
    const dir = await initedProject()

    const result = await runCli(["sync", "--all", "--auth-token", TOKEN, "--no-install", "--json"], { cwd: dir })

    expect(result.exitCode).toBe(0)
    expect(getMock().calls.find((c) => c.path === "/api/cli/verify")?.auth).toBe(`Bearer ${TOKEN}`)
  })

  it("authenticates with the SUBFRAME_AUTH_TOKEN env var", async () => {
    const dir = await initedProject()

    const result = await runCli(["sync", "--all", "--no-install", "--json"], { cwd: dir, token: TOKEN })

    expect(result.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/verify")).toBe(true)
  })

  it("reuses a cached token without re-verifying on the next command", async () => {
    const dir = await initedProject()
    const home = makeHome()

    // First run verifies and caches the token.
    const first = await runCli(["sync", "--all", "--no-install"], { cwd: dir, token: TOKEN, home })
    expect(first.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/verify")).toBe(true)

    getMock().reset()

    // Second run (same home) should hit the cache and skip the verify round-trip.
    const second = await runCli(["sync", "--all", "--no-install"], { cwd: dir, token: TOKEN, home })
    expect(second.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/verify")).toBe(false)
  })

  it("fails (without hanging) when the token is rejected", async () => {
    const dir = await initedProject()
    getMock().routes["GET /api/cli/verify"] = () => ({ status: 401, json: { message: "Invalid token" } })

    const result = await runCli(["sync", "--all"], { cwd: dir, token: "bad-token" })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/authenticate|invalid/i)
  })
})
