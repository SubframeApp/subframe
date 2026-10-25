const path = require("path")

function isMonacoPackageImport(source) {
  return source === "monaco-editor" || source.startsWith("monaco-editor/") || source === "@monaco-editor/react"
}

function isCodeEditorModuleImport(source) {
  return source === "./code-editor" || source.endsWith("/code-editor")
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Restrict monaco-editor imports to code-editor.tsx to keep the heavy dependency in a single lazy-loaded chunk",
      category: "Best Practices",
    },
    messages: {
      restrictedMonacoImport:
        'monaco-editor has a large bundle size and must stay in a single lazy-loaded chunk. Only import "monaco-editor" or "@monaco-editor/react" from code-editor.tsx.',
      restrictedStaticImport:
        'CodeEditor contains monaco-editor and must be lazy-loaded. Use: const CodeEditor = lazy(() => import("./code-editor"))',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename()
    const basename = path.basename(filename)

    if (basename === "code-editor.tsx") {
      return {}
    }

    return {
      ImportDeclaration(node) {
        // Type-only imports are erased at compile time and can't affect bundle size.
        if (node.importKind === "type") {
          return
        }
        const source = node.source.value
        if (isMonacoPackageImport(source)) {
          context.report({ node, messageId: "restrictedMonacoImport" })
        }
        if (isCodeEditorModuleImport(source)) {
          context.report({ node, messageId: "restrictedStaticImport" })
        }
      },
    }
  },
}
