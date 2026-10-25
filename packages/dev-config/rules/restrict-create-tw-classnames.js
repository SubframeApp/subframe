module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Require the dedicated createTwClassNames entry point to avoid importing the full UI library",
    },
    messages: {
      useSubpath:
        'Import createTwClassNames from "@subframe/core/tw-classnames" to avoid pulling in the full UI library.',
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== "@subframe/core") {
          return
        }
        for (const specifier of node.specifiers) {
          if (
            specifier.type === "ImportSpecifier" &&
            (specifier.imported.name ?? specifier.imported.value) === "createTwClassNames"
          ) {
            context.report({ node: specifier, messageId: "useSubpath" })
          }
          if (specifier.type !== "ImportNamespaceSpecifier") {
            continue
          }
          const variables = context.sourceCode.getDeclaredVariables(node)
          const variable = variables.find((variable) => variable.name === specifier.local.name)
          for (const reference of variable.references) {
            const parent = reference.identifier.parent
            if (
              parent.type === "MemberExpression" &&
              parent.object === reference.identifier &&
              (parent.computed ? parent.property.value : parent.property.name) === "createTwClassNames"
            ) {
              context.report({ node: parent, messageId: "useSubpath" })
            }
            if (
              parent.type === "VariableDeclarator" &&
              parent.init === reference.identifier &&
              parent.id.type === "ObjectPattern"
            ) {
              for (const property of parent.id.properties) {
                if (
                  property.type === "Property" &&
                  (property.computed ? property.key.value : property.key.name ?? property.key.value) ===
                    "createTwClassNames"
                ) {
                  context.report({ node: property, messageId: "useSubpath" })
                }
              }
            }
          }
        }
      },
      ExportNamedDeclaration(node) {
        if (node.source?.value !== "@subframe/core") {
          return
        }
        for (const specifier of node.specifiers) {
          if ((specifier.local.name ?? specifier.local.value) === "createTwClassNames") {
            context.report({ node: specifier, messageId: "useSubpath" })
          }
        }
      },
    }
  },
}
