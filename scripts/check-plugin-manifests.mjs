// Claude Code reads .claude-plugin/plugin.json; Codex and Cursor read the Agent Plugins plugin.json in the same folder.
// Fail when the copies disagree, so a release can't ship different metadata or servers per host.
import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const PLUGIN_DIR = "plugins/subframe"
const SHARED_FIELDS = ["name", "version", "description", "keywords"]

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"))
}

// Claude's .mcp.json allows a ${VAR:-default} URL for local development; compare the default.
function resolvedUrl(url) {
  const match = /^\$\{[A-Z_]+:-(.+)\}$/.exec(url)
  return match === null ? url : match[1]
}

function serverUrls(config) {
  return Object.fromEntries(
    Object.entries(config.mcpServers).map(([name, server]) => [name, resolvedUrl(server.url)]),
  )
}

const errors = []

const manifests = {
  claude: readJson(join(PLUGIN_DIR, ".claude-plugin/plugin.json")),
  agentPlugins: readJson(join(PLUGIN_DIR, "plugin.json")),
}

for (const field of SHARED_FIELDS) {
  const expected = JSON.stringify(manifests.claude[field])
  for (const [host, manifest] of Object.entries(manifests)) {
    if (JSON.stringify(manifest[field]) !== expected) {
      errors.push(`${host} manifest "${field}" differs from the Claude manifest`)
    }
  }
}

const claudeServers = JSON.stringify(serverUrls(readJson(join(PLUGIN_DIR, ".mcp.json"))))
const agentServers = JSON.stringify(serverUrls(readJson(join(PLUGIN_DIR, "mcp.json"))))
if (claudeServers !== agentServers) {
  errors.push(`MCP servers differ: .mcp.json ${claudeServers} vs mcp.json ${agentServers}`)
}

const marketplaces = {
  ".claude-plugin/marketplace.json": (entry) => entry.source,
  ".agents/plugins/marketplace.json": (entry) => entry.source.path,
  ".cursor-plugin/marketplace.json": (entry) => entry.source,
}
for (const [file, sourcePath] of Object.entries(marketplaces)) {
  const entries = readJson(file).plugins
  const entry = entries.find((plugin) => plugin.name === manifests.claude.name)
  if (entry === undefined) {
    errors.push(`${file} has no "${manifests.claude.name}" entry`)
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
  const claudeManifest = join(PLUGIN_DIR, ".claude-plugin/plugin.json")
  const baseManifest = git("ls-tree", "--name-only", mergeBase, "--", claudeManifest)
  const baseVersion = baseManifest === "" ? undefined : JSON.parse(git("show", `${mergeBase}:${claudeManifest}`)).version
  if (changed !== "" && manifests.claude.version === baseVersion) {
    errors.push(`${PLUGIN_DIR} changed but its version is still ${baseVersion}; bump it in both manifests`)
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}
console.log("Plugin manifests agree.")
