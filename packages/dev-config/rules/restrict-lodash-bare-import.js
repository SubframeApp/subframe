module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: 'Require per-method lodash imports instead of the bare "lodash" package',
      category: "Best Practices",
    },
    messages: {
      bareLodashImport:
        'Do not import from "lodash": it resolves to the monolithic CommonJS build, which bundlers cannot tree-shake. Import each function from its own module, e.g. import debounce from "lodash/debounce".',
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === "lodash" && node.importKind !== "type") {
          context.report({ node, messageId: "bareLodashImport" })
        }
      },
      ExportNamedDeclaration(node) {
        if (node.source?.value === "lodash" && node.exportKind !== "type") {
          context.report({ node, messageId: "bareLodashImport" })
        }
      },
      ExportAllDeclaration(node) {
        if (node.source.value === "lodash" && node.exportKind !== "type") {
          context.report({ node, messageId: "bareLodashImport" })
        }
      },
    }
  },
}
