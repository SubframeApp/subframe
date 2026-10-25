// never allow creating a token alias without using the safeTokenAliasHelpers

const MAKE_ALIAS_CALLEE = /^make(Color|Font|Border|Corner|Shadow)TokenAlias$/
const DEFAULT_TOKEN_CONSTANT = /^DEFAULT_/

function propertyNamed(objectExpression, name) {
  return objectExpression.properties.find(
    (property) =>
      property.type === "Property" &&
      ((property.key.type === "Identifier" && property.key.name === name) ||
        (property.key.type === "Literal" && property.key.value === name)),
  )
}

// Does this expression read from a DEFAULT_* constant or from getDefaultTokenWithName(...)?
function readsDefaultTokenId(node) {
  if (!node) {
    return false
  }
  switch (node.type) {
    case "Identifier":
      return DEFAULT_TOKEN_CONSTANT.test(node.name)
    case "MemberExpression":
      return readsDefaultTokenId(node.object)
    case "CallExpression":
      return (
        (node.callee.type === "Identifier" && node.callee.name === "getDefaultTokenWithName") ||
        readsDefaultTokenId(node.callee) ||
        node.arguments.some(readsDefaultTokenId)
      )
    case "ChainExpression":
    case "TSNonNullExpression":
    case "TSAsExpression":
      return readsDefaultTokenId(node.expression)
    default:
      return false
  }
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow building token aliases outside createSafeTokenAliasHelpers unless the id comes from a token in the current theme.",
      category: "Best Practices",
    },
    messages: {
      rawAliasLiteral:
        "Do not build a token alias literal. Use createSafeTokenAliasHelpers(currentTokensFamily).colorAlias(...) (or the font/border/corner/shadow variant) so the alias degrades to a resolved value when the project's theme lacks the token, or makeXTokenAlias when the id comes from a token in the current theme.",
      defaultIdIntoMakeAlias:
        "{{callee}} is being fed a default token id. Default tokens can be deleted or replaced by an imported theme; route this through createSafeTokenAliasHelpers(currentTokensFamily) instead.",
    },
    schema: [],
  },

  create(context) {
    return {
      /**
       * Example:
       * background: {
       *  color: { category: "token-alias", type: "color", tokenId: DEFAULT_COLORS.colors.backgroundDefault.id },
       * }
       */
      ObjectExpression(node) {
        const category = propertyNamed(node, "category")
        if (!category) {
          return
        }
        if (category.value.type === "Literal" && category.value.value === "token-alias") {
          context.report({ node, messageId: "rawAliasLiteral" })
        }
      },
      /**
       * Example:
       * makeColorTokenAlias({ tokenId: DEFAULT_COLORS.colors.backgroundDefault.id })
       */
      CallExpression(node) {
        if (node.callee.type !== "Identifier" || !MAKE_ALIAS_CALLEE.test(node.callee.name)) {
          return
        }
        const argument = node.arguments[0]
        if (!argument || argument.type !== "ObjectExpression") {
          return
        }
        const tokenId = propertyNamed(argument, "tokenId")
        if (tokenId && readsDefaultTokenId(tokenId.value)) {
          context.report({ node, messageId: "defaultIdIntoMakeAlias", data: { callee: node.callee.name } })
        }
      },
    }
  },
}
