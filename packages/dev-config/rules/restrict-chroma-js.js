const path = require("path")

const APPS_WEB_DIR = path.join("apps", "web")

function isInAppsWeb(filename) {
  return filename.includes(APPS_WEB_DIR)
}

function isTestFile(filename) {
  return (
    filename.endsWith(".spec.ts") ||
    filename.endsWith(".spec.tsx") ||
    filename.endsWith(".test.ts") ||
    filename.endsWith(".test.tsx")
  )
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Restrict chroma-js imports in apps/web/. Use safeParseColor or tryParseColor instead.",
      category: "Best Practices",
    },
    messages: {
      restrictedChromaImport:
        'Do not import "chroma-js" directly. Use safeParseColor (for untrusted input) or tryParseColor (for known-valid input) from "helpers/colors/color-helpers" instead.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename()

    if (!isInAppsWeb(filename) || isTestFile(filename)) {
      return {}
    }

    return {
      ImportDeclaration(node) {
        if (node.source.value === "chroma-js" && node.importKind !== "type") {
          context.report({ node, messageId: "restrictedChromaImport" })
        }
      },
    }
  },
}
