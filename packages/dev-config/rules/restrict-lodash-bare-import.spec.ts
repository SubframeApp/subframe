import { RuleTester } from "eslint"
import { describe, it } from "vitest"
import rule from "./restrict-lodash-bare-import"

RuleTester.describe = describe
RuleTester.it = it

new RuleTester({ languageOptions: { sourceType: "module" } }).run("restrict-lodash-bare-import", rule, {
  valid: [
    'import debounce from "lodash/debounce"',
    'import { debounce } from "lodash-es"',
    'export { x } from "./lodash"',
  ],
  invalid: [
    { code: 'import { debounce } from "lodash"', errors: [{ messageId: "bareLodashImport" }] },
    { code: 'import _ from "lodash"', errors: [{ messageId: "bareLodashImport" }] },
    { code: 'export { debounce } from "lodash"', errors: [{ messageId: "bareLodashImport" }] },
    { code: 'export * from "lodash"', errors: [{ messageId: "bareLodashImport" }] },
  ],
})
