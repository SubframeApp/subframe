import { RuleTester } from "eslint"
import { describe, it } from "vitest"
import rule from "./restrict-tw-classnames"

RuleTester.describe = describe
RuleTester.it = it

new RuleTester().run("restrict-tw-classnames", rule, {
  valid: [
    'import * as SubframeUtils from "ui/subframe/utils"; SubframeUtils.twClassNames("a")',
    'import { twClassNames } from "./lib/tw-classnames"',
    "function twClassNames() {}; twClassNames()",
  ],
  invalid: [
    {
      code: 'import { twClassNames } from "@subframe/core"',
      errors: [{ messageId: "invalidUsage" }],
    },
    {
      code: 'import { twClassNames as cn } from "@subframe/core"',
      errors: [{ messageId: "invalidUsage" }],
    },
    {
      code: 'import { twClassNames } from "@subframe/core/tw-classnames"',
      errors: [{ messageId: "invalidUsage" }],
    },
  ],
})
