import { readdirSync } from "node:fs"
import path from "node:path"

type SpecRunner = "unit" | "jsdom" | "browser" | "db" | "e2e" | "ground-truth"

const SPEC_FILE_PATTERN = /\.spec\.[jt]sx?$/
const ALLOWED_SPEC_NAME_PATTERN = /^[^.]+(\.(jsdom|browser|db|e2e|ground-truth))?\.spec\.tsx?$/
const IGNORED_DIRECTORIES = new Set(["node_modules", "dist", "public"])

function listSpecFiles(directory: string, relativeDirectory: string): string[] {
  const specs: string[] = []
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relativePath = path.posix.join(relativeDirectory, entry.name)
    if (entry.isDirectory()) {
      if (!entry.name.startsWith(".") && !IGNORED_DIRECTORIES.has(entry.name)) {
        specs.push(...listSpecFiles(path.join(directory, entry.name), relativePath))
      }
      continue
    }
    if (SPEC_FILE_PATTERN.test(entry.name)) {
      specs.push(relativePath)
    }
  }
  return specs
}

// A spec that no project includes never runs, and CI stays green. Fail at config load instead.
// `runnerGlobs` maps each runner the workspace has to the globs of its Vitest project, relative to `root`.
export function assertSpecNaming(options: { root: string; runnerGlobs: Partial<Record<SpecRunner, string[]>> }): void {
  const problems = listSpecFiles(options.root, "").flatMap((spec) => {
    const match = ALLOWED_SPEC_NAME_PATTERN.exec(path.posix.basename(spec))
    if (match === null) {
      return [
        `${spec}: the suffix must be one of .spec, .jsdom.spec, .browser.spec, .db.spec, .e2e.spec, .ground-truth.spec`,
      ]
    }
    const runner = (match[2] ?? "unit") as SpecRunner
    const globs = options.runnerGlobs[runner] ?? []
    if (!globs.some((glob) => path.posix.matchesGlob(spec, glob))) {
      return [`${spec}: the ${runner} project does not include this location`]
    }
    return []
  })
  if (problems.length > 0) {
    throw new Error(`Spec files must be named for their runner and be picked up by a project:\n${problems.join("\n")}`)
  }
}
