import { describe, expect, it } from "vitest"
import { makeProjectDir, runCli, scaffoldProject, setupMockServer, TOKEN, writeProjectFile } from "./harness"

const getMock = setupMockServer()

describe("push-component", () => {
  it("pushes a component and reports the component name", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)
    await writeProjectFile(dir, "Button.tsx", "export const Button = () => null\n")

    const result = await runCli(["push-component", "Button.tsx", "-p", "proj_1", "--json"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(0)
    expect(result.json()).toMatchObject({ ok: true, command: "push-component", componentName: "Button" })
    const pushCall = getMock().calls.find((c) => c.path === "/api/cli/push-component")
    expect((pushCall?.body as { componentName: string }).componentName).toBe("Button")
  })

  it("passes --skip-normalize through to the backend", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)
    await writeProjectFile(dir, "Button.tsx", "export const Button = () => null\n")

    const result = await runCli(["push-component", "Button.tsx", "-p", "proj_1", "--skip-normalize", "--json"], {
      cwd: dir,
      token: TOKEN,
    })

    expect(result.exitCode).toBe(0)
    const pushCall = getMock().calls.find((c) => c.path === "/api/cli/push-component")
    expect((pushCall?.body as { skipNormalize?: boolean }).skipNormalize).toBe(true)
  })

  it("fails when the file has no exported component", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)
    await writeProjectFile(dir, "not-a-component.ts", "const x = 1\n")

    const result = await runCli(["push-component", "not-a-component.ts", "-p", "proj_1"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/component name/i)
  })

  it("fails when the component file doesn't exist", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)

    const result = await runCli(["push-component", "missing.tsx", "-p", "proj_1"], { cwd: dir, token: TOKEN })

    expect(result.timedOut).toBe(false)
    expect(result.exitCode).toBe(1)
  })

  it("errors when the required --project-id is missing", async () => {
    const dir = makeProjectDir()
    await scaffoldProject(dir)
    await writeProjectFile(dir, "Button.tsx", "export const Button = () => null\n")

    const result = await runCli(["push-component", "Button.tsx"], { cwd: dir, token: TOKEN })

    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toMatch(/project-id/i)
  })
})
