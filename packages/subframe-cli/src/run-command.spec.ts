import { describe, expect, it, vi } from "vitest"
import { UserError } from "./errors"
import { emitResult } from "./output/output"
import { runCommand } from "./run-command"

vi.mock("./output/output", () => ({ emitResult: vi.fn() }))

describe("runCommand", () => {
  it("emits and rethrows a permission error as a UserError that names the path", async () => {
    const eperm = Object.assign(new Error("EPERM: operation not permitted, open '/d/package.json'"), {
      code: "EPERM",
      path: "/d/package.json",
    })

    const err = await runCommand("init", () => Promise.reject(eperm)).catch((e) => e)

    expect(err).toBeInstanceOf(UserError)
    expect(err.message).toContain("/d/package.json")
    expect(vi.mocked(emitResult).mock.calls[0][0]).toEqual({ ok: false, command: "init", error: err.message })
  })
})
