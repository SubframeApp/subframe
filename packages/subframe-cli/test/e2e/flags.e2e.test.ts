import { describe, expect, it } from "vitest"
import { makeProjectDir, PROJECT_SETTINGS, runCli, scaffoldProject, setupMockServer, TOKEN } from "./harness"

const getMock = setupMockServer()

async function syncProject() {
  const dir = makeProjectDir()
  await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"] })
  return dir
}

async function initProject() {
  const dir = makeProjectDir()
  await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })
  return dir
}

describe("flag interactions", () => {
  it("--auth-token takes precedence over the SUBFRAME_AUTH_TOKEN env var", async () => {
    const dir = await syncProject()

    const result = await runCli(["sync", "--all", "--auth-token", "flag-token", "--no-install", "--json"], {
      cwd: dir,
      token: "env-token", // would be used only if the flag didn't win
    })

    expect(result.exitCode).toBe(0)
    expect(getMock().calls.find((c) => c.path === "/api/cli/verify")?.auth).toBe("Bearer flag-token")
  })

  it("--non-interactive (strict) fails where --yes (lenient) accepts defaults — same args", async () => {
    const base = ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", "--json"]

    // Strict: the unspecified sync/install/tailwind steps must be given explicitly.
    const strict = await runCli([...base, "--non-interactive"], { cwd: await initProject(), token: TOKEN })
    expect(strict.exitCode).toBe(1)
    expect((strict.json() as { error: string }).error).toMatch(/--sync|--install|--tailwind/)

    getMock().reset()

    // Lenient: the same command accepts the safe defaults and completes.
    const lenient = await runCli([...base, "--yes"], { cwd: await initProject(), token: TOKEN })
    expect(lenient.exitCode).toBe(0)
  })

  it("the later of --sync / --no-sync wins (negatable flag precedence)", async () => {
    const base = ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", "--no-install", "--no-update-import-alias", "--json"]

    const noSyncWins = await runCli([...base, "--sync", "--no-sync"], { cwd: await initProject(), token: TOKEN })
    expect(noSyncWins.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/sync")).toBe(false)

    getMock().reset()

    const syncWins = await runCli([...base, "--no-sync", "--sync"], { cwd: await initProject(), token: TOKEN })
    expect(syncWins.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/sync")).toBe(true)
  })

  it("strict mode also governs the install step (not only init's prompts)", async () => {
    const dir = makeProjectDir()
    // No @subframe/core => installDependencies has work to do => the confirm fires.
    await scaffoldProject(dir, { syncSettings: PROJECT_SETTINGS, dirs: ["src"], coreVersion: null })

    const result = await runCli(["sync", "--all", "--non-interactive", "--json"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
    expect((result.json() as { error: string }).error).toMatch(/--install/)
  })

  it("strict mode succeeds once every value is supplied explicitly", async () => {
    const dir = await initProject()

    const result = await runCli(
      [
        "init",
        "--non-interactive",
        "--projectId",
        "proj_1",
        "--dir",
        "./src",
        "--alias",
        "@/ui/*",
        "--no-install",
        "--no-sync",
        "--no-tailwind",
        "--no-update-import-alias",
        "--json",
      ],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(0)
    expect(result.json()).toMatchObject({ ok: true, command: "init" })
  })

  it("--json implies non-interactive: a missing value fails with an envelope, never a prompt", async () => {
    const dir = await initProject()
    getMock().routes["GET /api/cli/list-projects"] = () => ({
      json: {
        projects: [
          { truncatedProjectId: "proj_1", name: "Alpha" },
          { truncatedProjectId: "proj_2", name: "Beta" },
        ],
      },
    })

    // No --projectId and multiple projects: would prompt interactively, but --json must not.
    const result = await runCli(["init", "--dir", "./src", "--alias", "@/ui/*", "--no-install", "--no-sync", "--json"], {
      cwd: dir,
      token: TOKEN,
    })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
    expect(result.json()).toMatchObject({ ok: false })
  })
})
