const base = require("eslint-config-base")

// Repo-root config. Each linted workspace ships its own eslint.config.cjs (flat config
// does not cascade), so this only applies to stray files linted from the repo root and
// to editor integrations that resolve the nearest config above a root-level file.
module.exports = [
  {
    ignores: ["**/dist/**", "**/.next/**", "**/.turbo/**", "**/.vercel/**"],
  },
  ...base,
]
