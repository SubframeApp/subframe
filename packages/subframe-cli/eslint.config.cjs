const custom = require("eslint-config-custom")

module.exports = [{ ignores: ["dist/**", "bin/**"] }, ...custom]
