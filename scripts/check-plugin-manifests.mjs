// Fail when a marketplace stops pointing at the plugin, or the plugin changes without a version bump.
import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const PLUGIN_DIR = "plugins/subframe"

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"))
}

const errors = []

const manifest = readJson(join(PLUGIN_DIR, "plugin.json"))

const marketplaces = {
  ".agents/plugins/marketplace.json": (entry) => entry.source.path,
  ".cursor-plugin/marketplace.json": (entry) => entry.source,
}
for (const [file, sourcePath] of Object.entries(marketplaces)) {
  const entries = readJson(file).plugins
  const entry = entries.find((plugin) => plugin.name === manifest.name)
  if (entry === undefined) {
    errors.push(`${file} has no "${manifest.name}" entry`)
    continue
  }
  const path = sourcePath(entry)
  if (path.replace(/^\.\//, "") !== PLUGIN_DIR || !existsSync(path)) {
    errors.push(`${file} points at ${path}, not ./${PLUGIN_DIR}`)
  }
}

// Installed copies stay on the manifest's version until it changes, so a plugin change without a bump never reaches them.
const baseRef = process.env.BASE_REF
if (baseRef !== undefined && baseRef !== "") {
  const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim()
  const mergeBase = git("merge-base", `origin/${baseRef}`, "HEAD")
  const changed = git("diff", "--name-only", mergeBase, "HEAD", "--", PLUGIN_DIR)
  const manifestPath = join(PLUGIN_DIR, "plugin.json")
  const baseVersion = JSON.parse(git("show", `${mergeBase}:${manifestPath}`)).version
  if (changed !== "" && manifest.version === baseVersion) {
    errors.push(`${PLUGIN_DIR} changed but its version is still ${baseVersion}; bump it in plugin.json`)
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}
console.log("Plugin manifests agree.")
