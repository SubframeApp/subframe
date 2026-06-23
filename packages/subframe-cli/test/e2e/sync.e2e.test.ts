import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { makeProjectDir, PROJECT_SETTINGS, runCli, scaffoldProject, setupMockServer,TOKEN } from "./harness"

const getMock = setupMockServer()

describe("sync", () => {
  it("syncs all components, writes files, and prints a JSON result", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, {
      dependencies: { tailwindcss: "^3.4.0" },
      syncSettings: PROJECT_SETTINGS,
      dirs: ["src"],
    })

    const result = await runCli(["sync", "--all", "--json", "--no-install"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(0)
    expect(result.json()).toMatchObject({ ok: true, command: "sync", projectId: "proj_1", components: "all" })
    expect(existsSync(join(dir, "src", "Button.tsx"))).toBe(true)
    expect(getMock().calls.find((c) => c.path === "/api/cli/verify")?.auth).toBe(`Bearer ${TOKEN}`)
  })

  it("syncs only the named components", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"] })

    const result = await runCli(["sync", "Button", "Card", "--json", "--no-install"], { cwd: dir, token: TOKEN })

    expect(result.exitCode).toBe(0)
    const syncCall = getMock().calls.find((c) => c.path === "/api/cli/sync")
    expect((syncCall?.body as { components: string[] }).components).toEqual(["Button", "Card"])
    expect(result.json()).toMatchObject({ command: "sync", components: ["Button", "Card"] })
  })

  it("fails fast with a JSON error envelope when the project isn't initialized", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir) // no .subframe/sync.json

    const result = await runCli(["sync", "--json"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
    expect(result.json()).toMatchObject({ ok: false, command: "sync" })
    expect((result.json() as { error: string }).error).toMatch(/init/i)
  })

  it("refuses to sync when --projectId disagrees with sync.json", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"] })

    const result = await runCli(["sync", "--all", "--projectId", "proj_other", "--no-install"], {
      cwd: dir,
      token: TOKEN,
    })

    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/project/i)
  })

  it("never hangs waiting for credentials in a non-TTY (exits with guidance)", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"] })

    const result = await runCli(["sync", "--all"], { cwd: dir }) // no token, empty home

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/credentials|auth-token|SUBFRAME_AUTH_TOKEN/i)
  })

  it("returns a non-zero code (not 0) when the backend rejects the sync", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"] })
    getMock().routes["POST /api/cli/sync"] = () => ({ status: 500, json: { message: "Internal error" } })

    const result = await runCli(["sync", "--all", "--no-install"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
  })

  it("warns about components the backend couldn't find", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"] })
    getMock().routes["POST /api/cli/sync"] = () => ({
      json: {
        definitionFiles: [],
        otherFiles: [],
        missingComponents: ["Nonexistent"],
        projectInfo: { teamId: 1, truncatedProjectId: "proj_1", name: "Test Project" },
      },
    })

    const result = await runCli(["sync", "Nonexistent", "--no-install"], { cwd: dir, token: TOKEN })

    expect(result.exitCode).toBe(0)
    // The "not found" warning is human chatter (console.log → stdout in non-json mode).
    expect(result.stdout).toMatch(/Nonexistent/)
  })

  it("backfills a missing teamId into sync.json (legacy migration)", async () => {
    const dir = makeProjectDir()
    const { teamId, ...withoutTeamId } = PROJECT_SETTINGS
    void teamId
    await scaffoldProject(dir, { syncSettings: withoutTeamId, dirs: ["src"] })

    const result = await runCli(["sync", "--all", "--no-install"], { cwd: dir, token: TOKEN })

    expect(result.exitCode).toBe(0)
    const written = JSON.parse(readFileSync(join(dir, ".subframe", "sync.json"), "utf8"))
    expect(written.teamId).toBe(1)
  })

  it("--json keeps stdout to just the result (chatter goes to stderr)", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"] })

    const result = await runCli(["sync", "--all", "--json", "--no-install"], { cwd: dir, token: TOKEN })

    expect(result.exitCode).toBe(0)
    // stdout parses cleanly as the single result object — no chatter mixed in.
    expect(result.json()).toMatchObject({ ok: true, command: "sync" })
  })
})
