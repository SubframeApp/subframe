import { ObjectLiteralExpression, ScriptKind, SyntaxKind } from "ts-morph"
import { _createSourceFile, _getQuoteChar } from "./updaters/update-tailwind-config"
import { getTailwindConfigPath } from "./utils/get-tailwind-config"
import { readFile, writeFile } from "node:fs/promises"
import { config } from "node:process"

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

export async function updateTailwindContent(cwd: string, relPath: string, content: string[], presets: string[]) {
  const configPath = await getTailwindConfigPath(cwd)
  if (!configPath) {
    printManualTailwindSteps(
      cwd,
      relPath,
      "Subframe could not find a tailwind configuration file. You might need to configure it manually:",
    )
    return
  }

  const raw = await readFile(configPath, "utf-8")
  let output = await transformTailwindConfigContent(raw, content, presets, configPath)
  if (output === raw) {
    printManualTailwindSteps(
      cwd,
      relPath,
      "Subframe could not automatically configure your Tailwind config. To setup manually:",
    )
    return
  }

  await writeFile(configPath, output, "utf-8")
}

export async function transformTailwindConfigContent(
  input: string,
  content: string[],
  presets: string[],
  configPath: string,
) {
  const { sourceFile, scriptKind } = await _createSourceFile(input, configPath)
  const configObject = sourceFile
    .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)
    .find((node) =>
      node
        .getProperties()
        .some((property) => property.isKind(SyntaxKind.PropertyAssignment) && property.getName() === "content"),
    )

  if (!configObject) {
    return input
  }

  addTailwindConfigContent(configObject, content)
  addTailwindConfigPresets(configObject, presets, scriptKind)

  return sourceFile.getFullText()
}

export async function addTailwindConfigContent(configObject: ObjectLiteralExpression, content: string[]) {
  const quoteChar = _getQuoteChar(configObject)

  // Update content property
  const existingProperty = configObject.getProperty("content")
  if (!existingProperty) {
    // Doesn't exist, so add it
    const newProperty = {
      name: "content",
      initializer: `[${quoteChar}${content.join(`${quoteChar}, ${quoteChar}`)}${quoteChar}]`,
    }
    configObject.addPropertyAssignment(newProperty)

    return configObject
  }

  if (existingProperty.isKind(SyntaxKind.PropertyAssignment)) {
    // Content property exists, so update it
    const initializer = existingProperty.getInitializer()
    if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
      // Content is an array, so append
      for (const contentItem of content) {
        const newValue = `${quoteChar}${contentItem}${quoteChar}`

        // Does the content array already contain the value?
        if (
          initializer
            .getElements()
            .map((element) => element.getText())
            .includes(newValue)
        ) {
          // if yes, skip
          continue
        }

        initializer.addElement(newValue)
      }
    }

    return configObject
  }

  return configObject
}

const importTemplateTs = (preset: string, quote: string) =>
  `(await import(${quote}${preset}${quote})).default as unknown as Partial<Config>`
const importTemplateJs = (preset: string, quote: string) => `(await import(${quote}${preset}${quote})).default`

export async function addTailwindConfigPresets(
  configObject: ObjectLiteralExpression,
  presets: string[],
  scriptKind: ScriptKind,
) {
  const quoteChar = _getQuoteChar(configObject)

  // Update presets property
  const existingProperty = configObject.getProperty("presets")
  if (!existingProperty) {
    // Doesn't exist, so add it
    const newProperty = {
      name: "presets",
      initializer: `[${presets
        .map((preset) =>
          scriptKind === ScriptKind.TS ? importTemplateTs(preset, quoteChar) : importTemplateJs(preset, quoteChar),
        )
        .join(", ")}]`,
    }
    configObject.addPropertyAssignment(newProperty)

    return configObject
  }

  if (existingProperty.isKind(SyntaxKind.PropertyAssignment)) {
    // presets property exists, so update it
    const initializer = existingProperty.getInitializer()
    if (initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) {
      // presets is an array, so append
      for (const presetsItem of presets) {
        const newValue =
          scriptKind === ScriptKind.TS
            ? importTemplateTs(presetsItem, quoteChar)
            : importTemplateJs(presetsItem, quoteChar)

        // Does the presets array already contain the value?
        if (
          initializer
            .getElements()
            .map((element) => element.getText())
            .includes(newValue)
        ) {
          // if yes, skip
          continue
        }

        initializer.addElement(newValue)
      }
    }

    return configObject
  }

  return configObject
}
