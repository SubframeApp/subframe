import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterEach, describe, expect, it } from "vitest"
import { assertSpecNaming } from "./spec-naming"

const roots: string[] = []

function makeWorkspace(files: string[]): string {
  const root = mkdtempSync(path.join(os.tmpdir(), "spec-naming-"))
  roots.push(root)
  for (const file of files) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    writeFileSync(path.join(root, file), "")
  }
  return root
}

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true })
  }
})

describe("assertSpecNaming", () => {
  it("accepts every runner suffix that a project includes", () => {
    const root = makeWorkspace(["src/a.spec.ts", "src/b.jsdom.spec.tsx", "node_modules/pkg/c.test.spec.ts"])
    expect(() => {
      assertSpecNaming({ root, runnerGlobs: { unit: ["src/**/*.spec.ts"], jsdom: ["src/**/*.jsdom.spec.tsx"] } })
    }).not.toThrow()
  })

  it("rejects a topic dot segment in front of the suffix", () => {
    const root = makeWorkspace(["src/a.slow.spec.ts"])
    expect(() => {
      assertSpecNaming({ root, runnerGlobs: { unit: ["src/**/*.spec.ts"] } })
    }).toThrow("src/a.slow.spec.ts: the suffix must be one of")
  })

  it("rejects a spec whose runner has no project", () => {
    const root = makeWorkspace(["src/a.browser.spec.ts"])
    expect(() => {
      assertSpecNaming({ root, runnerGlobs: { unit: ["src/**/*.spec.ts"] } })
    }).toThrow("src/a.browser.spec.ts: the browser project does not include this location")
  })

  it("rejects a spec outside the globs of its runner", () => {
    const root = makeWorkspace(["scripts/a.spec.ts"])
    expect(() => {
      assertSpecNaming({ root, runnerGlobs: { unit: ["src/**/*.spec.ts"] } })
    }).toThrow("scripts/a.spec.ts: the unit project does not include this location")
  })
})
