import { describe, expect, it } from "vitest"
import { makeProjectDir, runCli, scaffoldProject, setupMockServer, TOKEN, writeProjectFile } from "./harness"

const getMock = setupMockServer()

const VALID_MANIFEST = {
  theme: [],
  components: [{ name: "Button", entrypoint: "Button.tsx", sourceFiles: ["Button.tsx"], supportingFiles: [] }],
}

describe("import", () => {
  it("uploads a design system and starts the import", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)
    await writeProjectFile(dir, "Button.tsx", "export const Button = () => null\n")
    await writeProjectFile(dir, "manifest.json", JSON.stringify(VALID_MANIFEST))

    const result = await runCli(["import", "-p", "proj_1", "-m", "manifest.json", "--json"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(0)
    expect(result.json()).toMatchObject({ ok: true, command: "import", sessionId: "session_1" })
    const paths = getMock().calls.map((c) => `${c.method} ${c.path}`)
    expect(paths).toContain("POST /api/cli/import/create-session")
    expect(paths).toContain("PUT /mock-s3-upload")
    expect(paths).toContain("POST /api/cli/import/start")
  })

  it("fails on malformed manifest JSON", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)
    await writeProjectFile(dir, "manifest.json", "this is not json")

    const result = await runCli(["import", "-p", "proj_1", "-m", "manifest.json"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/parse manifest/i)
  })

  it("fails on an invalid manifest shape", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)
    // entrypoint not listed in sourceFiles
    await writeProjectFile(
      dir,
      "manifest.json",
      JSON.stringify({ theme: [], components: [{ name: "Button", entrypoint: "Button.tsx", sourceFiles: [], supportingFiles: [] }] }),
    )

    const result = await runCli(["import", "-p", "proj_1", "-m", "manifest.json"], { cwd: dir, token: TOKEN })

    expect(result.exitCode).toBe(1)
  })

  it("fails when the manifest file doesn't exist", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)

    const result = await runCli(["import", "-p", "proj_1", "-m", "missing.json"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
  })

  it("errors when required options are missing", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)

    const result = await runCli(["import", "-p", "proj_1"], { cwd: dir, token: TOKEN }) // no --manifest

    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toMatch(/manifest/i)
  })
})
