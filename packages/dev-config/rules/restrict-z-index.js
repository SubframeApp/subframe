// Z-index policy: every `z-*` tailwind class must be either a named class
// from packages/ui/styles/css-variables.scss (z-floating-panel, z-modal, etc.)
// or `z-[1]` inside an `isolate` parent. The same rule applies to inline
// `zIndex: N` values in JSX style props (only literal `1` allowed).

const Z_TOKEN = /(?:^|\s)(!?z-[^\s]+)/g
const NUMERIC = /^-?z-\d+$/
const ALLOWED_ARBITRARY = /^z-\[(1|var\(--z-index-[\w-]+\))\]$/

function isValidZClass(token) {
  const stripped = token.startsWith("!") ? token.slice(1) : token
  if (NUMERIC.test(stripped)) {
    return false
  }
  if (stripped.startsWith("z-[")) {
    return ALLOWED_ARBITRARY.test(stripped)
  }
  return true
}

function isInsideJsxStyleProp(propertyNode) {
  // Walk up: Property → ObjectExpression → JSXExpressionContainer → JSXAttribute(name="style").
  // Stops at the first non-matching ancestor — won't flag objects passed through function
  // calls, spread into other objects, or assigned to variables.
  const objectExpression = propertyNode.parent
  if (!objectExpression || objectExpression.type !== "ObjectExpression") {
    return false
  }
  const expressionContainer = objectExpression.parent
  if (!expressionContainer || expressionContainer.type !== "JSXExpressionContainer") {
    return false
  }
  const jsxAttribute = expressionContainer.parent
  if (!jsxAttribute || jsxAttribute.type !== "JSXAttribute") {
    return false
  }
  return jsxAttribute.name && jsxAttribute.name.name === "style"
}

function findInvalidZTokens(str) {
  if (typeof str !== "string" || !str.includes("z-")) {
    return []
  }
  const invalid = []
  let match
  Z_TOKEN.lastIndex = 0
  while ((match = Z_TOKEN.exec(str)) !== null) {
    const token = match[1]
    if (!isValidZClass(token)) {
      invalid.push(token)
    }
  }
  return invalid
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow numeric / arbitrary z-index tailwind classes and inline zIndex values. Use a named z-index class (z-floating-panel, z-modal, etc.) or z-[1] inside an `isolate` parent. See packages/ui/styles/css-variables.scss.",
      category: "Best Practices",
    },
    messages: {
      invalidZClass:
        '"{{token}}" is not allowed. Use a named z-index class (z-floating-panel, z-modal, z-tooltip, etc.) or `z-[1]` inside an `isolate` parent. See packages/ui/styles/css-variables.scss.',
      invalidInlineZIndex:
        "Inline `zIndex: {{value}}` is not allowed. Only `zIndex: 1` is permitted; for app-wide layers use a named CSS variable like `var(--z-index-modal)`. See packages/ui/styles/css-variables.scss.",
    },
    schema: [],
  },

  create(context) {
    function checkString(node, value) {
      const invalid = findInvalidZTokens(value)
      for (const token of invalid) {
        context.report({ node, messageId: "invalidZClass", data: { token } })
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          checkString(node, node.value)
        }
      },
      TemplateElement(node) {
        if (node.value && typeof node.value.cooked === "string") {
          checkString(node, node.value.cooked)
        }
      },
      // Catch inline { zIndex: <number> } in JSX style props only.
      // Plain object literals (theme configs, options bags) are out of scope —
      // the policy is about app stacking, not third-party library configuration.
      Property(node) {
        const key = node.key
        const isZIndex =
          (key.type === "Identifier" && key.name === "zIndex") || (key.type === "Literal" && key.value === "zIndex")
        if (!isZIndex) {
          return
        }
        if (!isInsideJsxStyleProp(node)) {
          return
        }
        const value = node.value
        if (value.type === "Literal" && typeof value.value === "number" && value.value !== 1) {
          context.report({
            node: value,
            messageId: "invalidInlineZIndex",
            data: { value: String(value.value) },
          })
        }
      },
    }
  },
}
