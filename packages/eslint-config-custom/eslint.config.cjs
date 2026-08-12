const base = require("./index.js")

// This package's own source is plain CommonJS .js, so re-scope the shared base
// from ts/tsx to .js.
module.exports = base.map((config) => ({ ...config, files: ["**/*.js"] }))
