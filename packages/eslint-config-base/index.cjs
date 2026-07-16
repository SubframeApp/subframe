const globals = require("globals")
const tsParser = require("@typescript-eslint/parser")
const reactHooks = require("eslint-plugin-react-hooks")
const simpleImportSort = require("eslint-plugin-simple-import-sort")
const unusedImports = require("eslint-plugin-unused-imports")
const turbo = require("eslint-plugin-turbo")
const prettier = require("eslint-config-prettier")

// Flat config has no `--ext`; file types are opted in via `files`. Restricting to
// ts/tsx means non-matching files (e.g. plain .js config files) are silently
// skipped rather than linted.
const TS_FILES = ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"]

// Scope a flat-config preset that declares no `files` of its own to TS_FILES, so
// imported `recommended` presets don't leak onto plain .js files (preserving the
// old `--ext ts,tsx` coverage). Shared here so workspace configs don't each redefine it.
function scopeToTs(config) {
  return config.files ? config : { ...config, files: TS_FILES }
}

// Portable ESLint base, kept free of project-specific rules so it can be shared
// as-is across repos. Any project-specific rules layer on top of this base in a
// config that extends it.
module.exports = [
  {
    files: TS_FILES,
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      turbo,
    },
    rules: {
      "sort-imports": "off", // replaced by simple-import-sort

      // plugin:react-hooks/recommended (flat)
      ...reactHooks.configs.recommended.rules,

      // eslint-config-turbo
      "turbo/no-undeclared-env-vars": "error",

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^\\u0000", // Side effect imports.
              "^@?\\w", // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              "^[^.]", // Absolute imports and other imports such as Vue-style `@/foo`. Does not start with a dot.
              "^\\.", // Relative imports. Starts with a dot.
            ],
          ],
        },
      ],

      "unused-imports/no-unused-imports": "error",
    },
  },
  {
    // eslint-config-prettier (flat) — disable formatting rules that conflict with Prettier.
    files: TS_FILES,
    ...prettier,
  },
]

// Exposed (as properties on the config array) so workspace flat configs can scope
// their own imported presets consistently instead of redefining the glob/helper.
module.exports.TS_FILES = TS_FILES
module.exports.scopeToTs = scopeToTs
