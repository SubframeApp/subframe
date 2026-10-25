const base = require("./index.js")

// Rule implementations use CommonJS .js, so also apply the shared base to .js
// and disable restrict-z-index — the rule
// definitions author the very patterns they police (e.g. the `z-[` literal in
// restrict-z-index.js).
module.exports = [
  ...base,
  ...base.map((config) => ({ ...config, files: ["**/*.js"] })),
  {
    files: ["**/*.js"],
    rules: { "local/restrict-z-index": "off" },
  },
]
