module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["turbo", "prettier", "plugin:react-hooks/recommended"],
  rules: {
    /** General */
    "sort-imports": "off", // replaced by simple-import-sort

    /**
     * eslint-plugin-import
     */
    "import/order": "off",

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
  plugins: ["simple-import-sort", "unused-imports"],
}
