import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { makeProjectDir, runCli, scaffoldProject, setupMockServer, TOKEN, writeProjectFile } from "./harness"

const getMock = setupMockServer()

// Common flags for a hermetic existing-project init (no network beyond the mock).
const SAFE = ["--no-install", "--no-sync", "--no-update-import-alias", "--json"]

describe("init (existing project)", () => {
  it("initializes a Tailwind v3 project end-to-end", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })

    const result = await runCli(
      ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", ...SAFE],
      { cwd: dir, token: TOKEN },
    )

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(0)
    expect(result.json()).toMatchObject({ ok: true, command: "init", cssType: "tailwind", didCreateNewProject: false })
    // sync settings + the generated theme style file are written.
    expect(existsSync(join(dir, ".subframe", "sync.json"))).toBe(true)
    expect(existsSync(join(dir, "src", "ui-styles.css"))).toBe(true)
  })

  it("detects the Tailwind version from package.json (no --css-type needed)", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })

    const result = await runCli(["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", ...SAFE], {
      cwd: dir,
      token: TOKEN,
    })

    expect(result.exitCode).toBe(0)
    expect(result.json()).toMatchObject({ cssType: "tailwind" })
  })

  it("injects the theme import into the global CSS for Tailwind v4", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^4.0.0" }, dirs: ["src"] })
    await writeProjectFile(dir, "src/index.css", '@import "tailwindcss";\n')

    const result = await runCli(
      [
        "init",
        "--projectId",
        "proj_1",
        "--css-type",
        "tailwind-v4",
        "--dir",
        "./src",
        "--alias",
        "@/ui/*",
        "--css-path",
        "./src/index.css",
        ...SAFE,
      ],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(0)
    expect(result.json()).toMatchObject({ cssType: "tailwind-v4" })
    expect(readFileSync(join(dir, "src", "index.css"), "utf8")).toMatch(/theme\.css/)
  })

  it("configures an existing tailwind.config.js when --tailwind is set", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })
    await writeProjectFile(dir, "tailwind.config.js", "module.exports = { content: [], theme: { extend: {} } }\n")

    const result = await runCli(
      ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", "--tailwind", ...SAFE],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(0)
    expect(readFileSync(join(dir, "tailwind.config.js"), "utf8")).toMatch(/presets/)
  })

  it("--no-tailwind leaves an existing tailwind.config.js untouched", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })
    const original = "module.exports = { content: [], theme: { extend: {} } }\n"
    await writeProjectFile(dir, "tailwind.config.js", original)

    const result = await runCli(
      ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", "--no-tailwind", ...SAFE],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(0)
    expect(readFileSync(join(dir, "tailwind.config.js"), "utf8")).toBe(original)
  })
})

describe("init (project selection)", () => {
  it("auto-selects when the account has a single project", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })

    const result = await runCli(["init", "--dir", "./src", "--alias", "@/ui/*", ...SAFE], { cwd: dir, token: TOKEN })

    expect(result.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/list-projects")).toBe(true)
  })

  it("fails (instead of guessing) when there are multiple projects and no --projectId", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })
    getMock().routes["GET /api/cli/list-projects"] = () => ({
      json: {
        projects: [
          { truncatedProjectId: "proj_1", name: "Alpha" },
          { truncatedProjectId: "proj_2", name: "Beta" },
        ],
      },
    })

    const result = await runCli(["init", "--dir", "./src", "--alias", "@/ui/*", ...SAFE], { cwd: dir, token: TOKEN })

    expect(result.exitCode).toBe(1)
    expect((result.json() as { error: string }).error).toMatch(/multiple|projectId/i)
  })

  it("skips listing projects when --projectId is supplied", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })

    const result = await runCli(["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", ...SAFE], {
      cwd: dir,
      token: TOKEN,
    })

    expect(result.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/list-projects")).toBe(false)
  })
})

describe("init (import alias update)", () => {
  const initWithOldAlias = () => ({
    json: {
      styleFile: { fileType: "css", fileName: "ui-styles.css", directory: "", metadata: {}, contents: "/* */" },
      cssType: "tailwind",
      oldImportAlias: "@/old",
      projectInfo: { teamId: 1, truncatedProjectId: "proj_1", name: "Test Project" },
    },
  })

  it("updates the import alias when --update-import-alias is set", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })
    getMock().routes["POST /api/cli/init"] = initWithOldAlias

    const result = await runCli(
      ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", "--update-import-alias", "--no-install", "--no-sync", "--json"],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(0)
    const aliasCall = getMock().calls.find((c) => c.path === "/api/cli/import-alias")
    expect(aliasCall).toBeDefined()
    expect((aliasCall?.body as { importAlias: string }).importAlias).toBe("@/ui")
  })

  it("leaves the import alias alone with --no-update-import-alias", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })
    getMock().routes["POST /api/cli/init"] = initWithOldAlias

    const result = await runCli(
      ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", "--no-update-import-alias", "--no-install", "--no-sync", "--json"],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/import-alias")).toBe(false)
  })
})

describe("init (sync step)", () => {
  it("--no-sync skips the initial component sync", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })

    const result = await runCli(
      ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", "--no-sync", "--no-install", "--no-update-import-alias", "--json"],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/sync")).toBe(false)
  })

  it("--sync runs the initial component sync", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })

    const result = await runCli(
      ["init", "--projectId", "proj_1", "--dir", "./src", "--alias", "@/ui/*", "--sync", "--no-install", "--no-update-import-alias", "--json"],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(0)
    expect(getMock().calls.some((c) => c.path === "/api/cli/sync")).toBe(true)
  })
})

describe("init (validation & strict mode)", () => {
  it("rejects a malformed --alias (missing /*) instead of writing a broken config", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir, { dependencies: { tailwindcss: "^3.4.0" }, dirs: ["src"] })

    const result = await runCli(
      ["init", "--projectId", "proj_1", "--alias", "@/ui", "--dir", "./src", ...SAFE],
      { cwd: dir, token: TOKEN },
    )

    expect(result.exitCode).toBe(1)
    expect((result.json() as { error?: string }).error ?? "").toMatch(/alias/i)
  })

  it("strict mode fails fast naming the missing flag instead of prompting", async () => {
    const dir = makeProjectDir() // no package.json => new-project flow

    const result = await runCli(["init", "--non-interactive", "--template", "vite", "--name", "foo"], { cwd: dir })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/--css-type/)
  })
})
