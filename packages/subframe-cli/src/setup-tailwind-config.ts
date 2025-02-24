import { join } from "node:path"
import prompts from "prompts"
import { printNode, Project, SourceFile, ts } from "ts-morph"
import { abortOnState } from "./sync-helpers"
import { getExpressionForDefaultExport, isDefaultExport } from "./transforms/is-export"
import {
  hasSubframeContentGlob,
  hasSubframeRequire,
  isContentProperty,
  isPresetsProperty,
  makeSubframeContentGlob,
  makeSubframeRequire,
} from "./transforms/tailwind"

function printManualTailwindSteps(cwd: string, subframeDirPath: string, prependText: string) {
  const subframePresetRequire = printNode(makeSubframeRequire(cwd, subframeDirPath))
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath)

  const warningMessage = `${prependText}
1. Append the following to the presets array, or create if it doesn't exist: ${subframePresetRequire}
2. Append the following to the content array: ${subframeContentGlob}

Your end results should look something like this:

module.exports = {
  presets: [${subframePresetRequire}], // added by Subframe
  content: [
    // already existing content
    "${subframeContentGlob}", // added by Subframe
  ],
  // everything else
};
`

  // makes the warning message cyan via https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
  console.log("\x1b[36m%s\x1b[0m", warningMessage)
}

export async function setupTailwindConfig(cwd: string, subframeDirPath: string) {
  const subframePresetRequireAST = makeSubframeRequire(cwd, subframeDirPath)
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath)

  const project = new Project({ compilerOptions: { allowJs: true } })

  const tailwindConfigPath = join(cwd, `tailwind.config.{js,mjs,cjs,ts,mts,cts}`)
  project.addSourceFilesAtPaths(tailwindConfigPath)
  const tailwindConfig = project.getSourceFile(tailwindConfigPath)

  /** no Tailwind config, let's skip this step then */
  if (!tailwindConfig) {
    printManualTailwindSteps(
      cwd,
      subframeDirPath,
      "Subframe could not find a tailwind.config.js file. If you use a .ts file, you'll need to configure it manually:",
    )
    return
  }

  /** config before transformations */
  const initialText = tailwindConfig.print()

  // naïve heuristics to check that the
  // subframe preset and content glob have
  // been properly set up
  if (
    initialText.indexOf(
      // example: require("./<path-to-subframe>/tailwind.config.js")
      printNode(subframePresetRequireAST),
    ) !== -1 &&
    initialText.indexOf(
      // example: "./<path-to-subframe>/**/*.{tsx,ts,js,jsx}"
      subframeContentGlob,
    ) !== -1
  ) {
    return
  }

  const response = await prompts({
    type: "confirm",
    name: "updateTailwindConfig",
    initial: true,
    message: "Do you want Subframe to configure your Tailwind config?",
    onState: abortOnState,
  })
  if (!response.updateTailwindConfig) {
    return
  }

  transformTailwindConfigFile(tailwindConfig, cwd, subframeDirPath)

  await tailwindConfig.save()
}

// helper function that's exported for testing
// NOTE: mutates tailwindConfig file in place
export function transformTailwindConfigFile(tailwindConfig: SourceFile, cwd: string, subframeDirPath: string) {
  const subframePresetRequireAST = makeSubframeRequire(cwd, subframeDirPath)
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath)

  const initialText = tailwindConfig.print()

  tailwindConfig.transform((traversal) => {
    const node = traversal.visitChildren()

    if (isDefaultExport(node)) {
      const exportedExpression = getExpressionForDefaultExport(node)

      if (
        // assert that the default export is an object literal:
        !ts.isObjectLiteralExpression(exportedExpression)
      ) {
        return node
      }

      const properties = exportedExpression.properties
        /** transform the content and presets properties */
        .map((property) => {
          if (isContentProperty(property) && !hasSubframeContentGlob(property.initializer, cwd, subframeDirPath)) {
            return traversal.factory.updatePropertyAssignment(
              property,
              property.name,
              traversal.factory.createArrayLiteralExpression([
                ...property.initializer.elements,
                traversal.factory.createStringLiteral(subframeContentGlob),
              ]),
            )
          }

          if (isPresetsProperty(property) && !hasSubframeRequire(property.initializer, cwd, subframeDirPath)) {
            return traversal.factory.updatePropertyAssignment(
              property,
              property.name,
              traversal.factory.createArrayLiteralExpression([
                ...property.initializer.elements,
                subframePresetRequireAST,
              ]),
            )
          }

          return property
        })

      // if there's no content property, add it
      if (properties.findIndex(isContentProperty) === -1) {
        properties.push(
          traversal.factory.createPropertyAssignment(
            traversal.factory.createIdentifier("content"),
            traversal.factory.createArrayLiteralExpression([
              traversal.factory.createStringLiteral(subframeContentGlob),
            ]),
          ),
        )
      }

      // if there's no presets property, add it
      if (properties.findIndex(isPresetsProperty) === -1) {
        properties.push(
          traversal.factory.createPropertyAssignment(
            traversal.factory.createIdentifier("presets"),
            traversal.factory.createArrayLiteralExpression([subframePresetRequireAST]),
          ),
        )
      }

      if (ts.isExportAssignment(node)) {
        return traversal.factory.updateExportAssignment(
          node,
          node.modifiers,
          traversal.factory.updateObjectLiteralExpression(exportedExpression, properties),
        )
      }

      return traversal.factory.updateBinaryExpression(
        node,
        node.left,
        node.operatorToken,
        traversal.factory.updateObjectLiteralExpression(exportedExpression, properties),
      )
    }

    return node
  })

  /** config after transformations */
  const finalText = tailwindConfig.print()

  /**
   * No material changes could be made to the config,
   * so we warn the user and skip this step.
   *
   * This could be due to:
   * - the config structure being different than expected
   * - the config already being set up
   * - the config being empty
   * - the config file being invalid
   */
  if (initialText === finalText) {
    printManualTailwindSteps(
      cwd,
      subframeDirPath,
      "Subframe could not automatically configure your Tailwind config. To setup manually:",
    )
    return
  }

  tailwindConfig.formatText({
    indentSize: 2,
  })
}
