import { join } from "node:path"
import ora from "ora"
import prompts from "prompts"
import { ObjectLiteralExpression, printNode, Project, QuoteKind, SourceFile, SyntaxKind } from "ts-morph"
import { abortOnState } from "./prompt-helpers"
import { makeSubframeContentGlob, makeSubframeRequire } from "./transforms/tailwind"

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
function _getQuoteChar(configObject: ObjectLiteralExpression) {
  return configObject.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getQuoteKind() === QuoteKind.Single
    ? "'"
    : '"'
}

export async function setupTailwindConfig(cwd: string, subframeDirPath: string, opts: { tailwind?: boolean }) {
  const subframePresetRequireAST = makeSubframeRequire(cwd, subframeDirPath)
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath)

  const project = new Project({ compilerOptions: { allowJs: true } })

  project.addSourceFileAtPathIfExists(join(cwd, "tailwind.config.ts"))
  project.addSourceFileAtPathIfExists(join(cwd, "tailwind.config.js"))

  const tailwindConfig =
    project.getSourceFile(join(cwd, "tailwind.config.ts")) ?? project.getSourceFile(join(cwd, "tailwind.config.js"))

  /** no Tailwind config, let's skip this step then */
  if (!tailwindConfig) {
    printManualTailwindSteps(
      cwd,
      subframeDirPath,
      "Subframe could not find a tailwind.config.js or tailwind.config.ts file. To configure it manually:",
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

  prompts.override({
    updateTailwindConfig: opts.tailwind,
  })
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

  const spinner = ora("Updating Tailwind config").start()
  transformTailwindConfigFile(tailwindConfig, cwd, subframeDirPath)
  await tailwindConfig.save()
  spinner.succeed("Tailwind config updated")
}

// helper function that's exported for testing
// NOTE: mutates tailwindConfig file in place
export function transformTailwindConfigFile(tailwindConfig: SourceFile, cwd: string, subframeDirPath: string) {
  const initialText = tailwindConfig.print()

  const configObject = tailwindConfig.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)[0]
  if (!configObject) {
    printManualTailwindSteps(
      cwd,
      subframeDirPath,
      "Subframe could not find a valid Tailwind config object. To setup manually:",
    )
    return
  }

  const subframePresetRequireAST = makeSubframeRequire(cwd, subframeDirPath)
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath)

  const subframePresetAstText = printNode(subframePresetRequireAST)

  addTailwindConfigContent(configObject, subframeContentGlob)
  addTailwindConfigPresets(configObject, subframePresetAstText)

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

// Yoinked from: https://github.com/shadcn-ui/ui/blob/main/packages/shadcn/src/utils/updaters/update-tailwind-content.ts#L75
async function addTailwindConfigContent(configObject: ObjectLiteralExpression, content: string) {
  const quoteChar = _getQuoteChar(configObject)
  const existingProperty = configObject
    .getDescendantsOfKind(SyntaxKind.PropertyAssignment)
    .find((property) => property.getName().includes("content"))

  if (!existingProperty) {
    const newProperty = {
      name: "content",
      initializer: `[${quoteChar}${content}${quoteChar}]`,
    }
    configObject.addPropertyAssignment(newProperty)

    return configObject
  }

  if (existingProperty.isKind(SyntaxKind.PropertyAssignment)) {
    const initializer = existingProperty.getInitializer()

    // If property is an array, append.
    if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
      const newValue = `${quoteChar}${content}${quoteChar}`

      // Check if the array already contains the value.
      if (
        initializer
          .getElements()
          .map((element) => element.getText())
          .includes(newValue)
      ) {
        return configObject
      }

      initializer.addElement(newValue)
    }

    return configObject
  }

  return configObject
}

async function addTailwindConfigPresets(configObject: ObjectLiteralExpression, presets: string) {
  const existingProperty = configObject
    .getDescendantsOfKind(SyntaxKind.PropertyAssignment)
    .find((property) => property.getName().includes("presets"))

  if (!existingProperty) {
    const newProperty = {
      name: "presets",
      initializer: `[${presets}]`,
    }
    configObject.addPropertyAssignment(newProperty)

    return configObject
  }

  if (existingProperty.isKind(SyntaxKind.PropertyAssignment)) {
    const initializer = existingProperty.getInitializer()

    // If property is an array, append.
    if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
      const newValue = presets

      // Check if the array already contains the value.
      if (
        initializer
          .getElements()
          .map((element) => element.getText())
          .includes(newValue)
      ) {
        return configObject
      }

      initializer.addElement(newValue)
    }

    return configObject
  }

  return configObject
}
