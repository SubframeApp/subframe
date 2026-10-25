module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Require cloneDeep from helpers instead of lodash's cloneDeep",
      category: "Best Practices",
    },
    messages: {
      invalidUsage:
        'Use cloneDeep from "helpers" instead of lodash\'s cloneDeep. Import with: import { cloneDeep } from "helpers/object-helpers"',
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value

        if (source === "lodash" || source === "lodash/cloneDeep") {
          node.specifiers.forEach((specifier) => {
            if (specifier.type === "ImportSpecifier" && specifier.imported.name === "cloneDeep") {
              context.report({
                node: specifier,
                messageId: "invalidUsage",
              })
            }

            if (specifier.type === "ImportDefaultSpecifier" && source === "lodash/cloneDeep") {
              context.report({
                node: specifier,
                messageId: "invalidUsage",
              })
            }
          })
        }
      },

      MemberExpression(node) {
        if (
          node.object.type === "Identifier" &&
          node.object.name === "_" &&
          node.property.type === "Identifier" &&
          node.property.name === "cloneDeep"
        ) {
          context.report({
            node: node.property,
            messageId: "invalidUsage",
          })
        }
      },
    }
  },
}
