import { RuleTester } from "eslint"
import { describe, it } from "vitest"
import rule from "./restrict-create-tw-classnames"

RuleTester.describe = describe
RuleTester.it = it

new RuleTester().run("restrict-create-tw-classnames", rule, {
  valid: [
    'import { createTwClassNames } from "@subframe/core/tw-classnames"',
    'import { Button } from "@subframe/core"',
    'import * as Core from "@subframe/core"; Core.Button',
    "const Core = { createTwClassNames() {} }; Core.createTwClassNames()",
    'import * as Core from "@subframe/core"; function use(Core) { Core.createTwClassNames() }',
    'export { createTwClassNames } from "@subframe/core/tw-classnames"',
  ],
  invalid: [
    {
      code: 'import { createTwClassNames as makeClasses, Button } from "@subframe/core"',
      errors: [{ messageId: "useSubpath" }],
    },
    {
      code: 'import * as Core from "@subframe/core"; Core.createTwClassNames([])',
      errors: [{ messageId: "useSubpath" }],
    },
    {
      code: 'import * as Core from "@subframe/core"; Core["createTwClassNames"]([])',
      errors: [{ messageId: "useSubpath" }],
    },
    {
      code: 'import * as Core from "@subframe/core"; const { createTwClassNames: makeClasses } = Core',
      errors: [{ messageId: "useSubpath" }],
    },
    {
      code: 'export { createTwClassNames as makeClasses } from "@subframe/core"',
      errors: [{ messageId: "useSubpath" }],
    },
  ],
})
