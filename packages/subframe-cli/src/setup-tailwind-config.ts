import { ObjectLiteralExpression, printNode, Project, QuoteKind, ScriptKind, SyntaxKind } from "ts-morph"
import { getTailwindConfigPath } from "./utils/get-tailwind-config"
import { readFile, writeFile, mkdtemp } from "node:fs/promises"
import { join, basename, extname } from "node:path"
import { tmpdir } from "node:os"
import { makeSubframeContentGlob, makeSubframeRequire } from "./transforms/tailwind"

async function _createSourceFile(input: string, configPath: string) {
  const dir = await mkdtemp(join(tmpdir(), "subframe-"))
  const tempFile = join(dir, `subframe-${basename(configPath)}`)

  const project = new Project({
    compilerOptions: {},
  })
  const scriptKind = extname(configPath).endsWith("ts") ? ScriptKind.TS : ScriptKind.JS

  const sourceFile = project.createSourceFile(tempFile, input, {
    scriptKind,
  })

  return { sourceFile, scriptKind }
}

export function _getQuoteChar(configObject: ObjectLiteralExpression) {
  return configObject.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getQuoteKind() === QuoteKind.Single
    ? "'"
    : '"'
}

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

// Note(Chris): yoinked from: https://github.com/shadcn-ui/ui/blob/535a7d9220b5812846636f4ec51a4cfef6dec9cd/packages/shadcn/src/utils/updaters/update-tailwind-content.ts#L12
export async function updateTailwindContent(cwd: string, relPath: string) {
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
  const output = await transformTailwindConfigContent(raw, relPath, configPath)

  const subframePresetRequire = printNode(makeSubframeRequire(cwd, relPath))
  const subframeContentGlob = makeSubframeContentGlob(cwd, relPath)
  if (
    output.indexOf(
      // example: require("./<path-to-subframe>/tailwind.config.js")
      subframePresetRequire,
    ) !== -1 &&
    output.indexOf(
      // example: "./<path-to-subframe>/**/*.{tsx,ts,js,jsx}"
      subframeContentGlob,
    ) !== -1
  ) {
    printManualTailwindSteps(
      cwd,
      relPath,
      "Subframe could not automatically configure your Tailwind config. To setup manually:",
    )
    return
  }

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

export async function transformTailwindConfigContent(input: string, relPath: string, configPath: string) {
  const content = [`./${relPath}/**/*.{tsx,ts,js,jsx}`]
  const presets = [`./${relPath}/tailwind.config`]

  const output = await _createSourceFile(input, configPath)
  const { sourceFile, scriptKind } = output
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
