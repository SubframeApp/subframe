const CORE_SOURCES = new Set(["@subframe/core", "@subframe/core/tw-classnames"])

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow importing twClassNames from @subframe/core; use SubframeUtils.twClassNames",
      category: "Best Practices",
    },
    messages: {
      invalidUsage:
        'Use SubframeUtils.twClassNames instead. Import with: import * as SubframeUtils from "ui/subframe/utils"',
    },
    schema: [],
  },

  create(context) {
    return {
      ImportSpecifier(node) {
        if (!CORE_SOURCES.has(node.parent.source.value)) {
          return
        }
        const imported = node.imported.type === "Identifier" ? node.imported.name : node.imported.value
        if (imported !== "twClassNames") {
          return
        }
        context.report({ node, messageId: "invalidUsage" })
      },
    }
  },
}
