const globals = require("globals")
const tsParser = require("@typescript-eslint/parser")
const reactHooks = require("eslint-plugin-react-hooks")
const importPlugin = require("eslint-plugin-import")
const simpleImportSort = require("eslint-plugin-simple-import-sort")
const unusedImports = require("eslint-plugin-unused-imports")
const turbo = require("eslint-plugin-turbo")
const prettier = require("eslint-config-prettier")

// Project-local ESLint rules, registered as a native flat-config plugin object
// under the `local/` namespace. The rule definitions in ./rules/*.js are plain
// CommonJS ESLint rule modules.
const localPlugin = {
  rules: {
    "restrict-tw-classnames": require("./rules/restrict-tw-classnames"),
    "restrict-create-tw-classnames": require("./rules/restrict-create-tw-classnames"),
    "restrict-lodash-clone-deep": require("./rules/restrict-lodash-clone-deep"),
    "restrict-lodash-bare-import": require("./rules/restrict-lodash-bare-import"),
    "restrict-monaco-editor": require("./rules/restrict-monaco-editor"),
    "restrict-chroma-js": require("./rules/restrict-chroma-js"),
    "restrict-z-index": require("./rules/restrict-z-index"),
    "no-raw-token-alias": require("./rules/no-raw-token-alias"),
  },
}

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

// Files that may import devDependencies: tests, test setup, config and scripts.
const DEV_DEPENDENCY_FILES = [
  "**/*.spec.{ts,tsx}",
  "**/*.test.{ts,tsx}",
  "**/tests/**",
  "**/vitest.setup.*",
  "**/setup*Tests.*",
  "**/*.config.*",
  "**/scripts/**",
]

// Apps are leaves: code that two apps need moves into a package. Workspace configs that set their own
// no-restricted-imports must include this pattern.
const APP_IMPORT_BAN = {
  regex: "^(chrome-extension|desktop|mcp|public-ui|screenshot|web)(/|$)",
  message: "Apps cannot import other apps; move the shared code into a package.",
}

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
    settings: {
      // Provided by the Electron runtime like a Node built-in, so it is never a declared dependency.
      "import/core-modules": ["electron"],
      // Without a working resolver, import/no-extraneous-dependencies silently skips subpath and workspace imports.
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
      },
    },
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      turbo,
      local: localPlugin,
    },
    rules: {
      "sort-imports": "off", // replaced by simple-import-sort

      eqeqeq: ["error", "always"],

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

      "import/no-extraneous-dependencies": [
        "error",
        {
          includeTypes: true,
          peerDependencies: true,
          devDependencies: DEV_DEPENDENCY_FILES,
        },
      ],
      "import/no-relative-packages": "error",
      "import/no-empty-named-blocks": "error",
      "no-restricted-imports": ["error", { patterns: [APP_IMPORT_BAN] }],

      "local/restrict-tw-classnames": "error",
      "local/restrict-create-tw-classnames": "error",
      "local/restrict-lodash-clone-deep": "error",
      "local/restrict-lodash-bare-import": "error",
      "local/restrict-monaco-editor": "error",
      "local/restrict-chroma-js": "error",
      "local/restrict-z-index": "error",
      "local/no-raw-token-alias": "error",
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.spec.tsx", "**/tests/**"],
    rules: { "local/no-raw-token-alias": "off" },
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
module.exports.DEV_DEPENDENCY_FILES = DEV_DEPENDENCY_FILES
module.exports.APP_IMPORT_BAN = APP_IMPORT_BAN
