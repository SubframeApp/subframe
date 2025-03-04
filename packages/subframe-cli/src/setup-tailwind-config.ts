import { ObjectLiteralExpression, printNode, Project, QuoteKind, ScriptKind, SourceFile, SyntaxKind } from "ts-morph"
import { getTailwindConfigPath } from "./utils/get-tailwind-config"
import { readFile, writeFile, mkdtemp } from "node:fs/promises"
import prompts from "prompts"
import { join, basename, extname } from "node:path"
import { tmpdir } from "node:os"
import { makeSubframeContentGlob, makeSubframeRequire } from "./transforms/tailwind"
import ora from "ora"
import { abortOnState } from "./sync-helpers"

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
export async function updateTailwindContent(cwd: string, relPath: string, opts: { tailwind?: boolean }) {
  const configPath = await getTailwindConfigPath(cwd)
  if (!configPath) {
    printManualTailwindSteps(
      cwd,
      relPath,
      "Subframe could not find a tailwind configuration file. You might need to configure it manually:",
    )
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

  const subframePresetRequire = printNode(makeSubframeRequire(cwd, relPath))
  const subframeContentGlob = makeSubframeContentGlob(cwd, relPath)
  const raw = await readFile(configPath, "utf-8")
  if (
    raw.indexOf(
      // example: require("./<path-to-subframe>/tailwind.config.js")
      subframePresetRequire,
    ) !== -1 &&
    raw.indexOf(
      // example: "./<path-to-subframe>/**/*.{tsx,ts,js,jsx}"
      subframeContentGlob,
    ) !== -1
  ) {
    return
  }

  const spinner = ora("Updating Tailwind config").start()
  const output = await transformTailwindConfigContent(raw, relPath, configPath)
  if (output === raw) {
    printManualTailwindSteps(
      cwd,
      relPath,
      "Subframe could not automatically configure your Tailwind config. To setup manually:",
    )
    return
  }
  await writeFile(configPath, output, "utf-8")
  spinner.succeed("Tailwind config updated")
}

export interface Preset {
  importName: string
  path: string
}

export async function transformTailwindConfigContent(input: string, relPath: string, configPath: string) {
  const content = [`./${relPath}/**/*.{tsx,ts,js,jsx}`]
  const presets: Preset[] = [
    {
      importName: "subframeTailwindConfig",
      path: `./${relPath}/tailwind.config`,
    },
  ]

  const { sourceFile, scriptKind } = await _createSourceFile(input, configPath)
  const configObject = sourceFile.getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression).find((node) =>
    node.getProperties().some((property) => {
      const isProperty = property.isKind(SyntaxKind.PropertyAssignment)
      if (!isProperty) return false
      const isContent = property.getName() === "content" || property.getName() === '"content"'
      return isProperty && isContent
    }),
  )

  if (!configObject) {
    return input
  }

  await addTailwindConfigContent(configObject, content)
  await addTailwindConfigPresets(configObject, presets, scriptKind)
  await addTailwindConfigTypeImport(sourceFile, scriptKind)
  await addPresetImports(sourceFile, presets)

  return sourceFile.getFullText()
}

export async function addTailwindConfigContent(configObject: ObjectLiteralExpression, content: string[]) {
  const quoteChar = _getQuoteChar(configObject)

  // Update content property
  const existingProperty =
    configObject.getProperty("content") ?? configObject.getProperty(`${quoteChar}content${quoteChar}`)
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

const tailwindTemplateTs = (configName: string) => `${configName} as unknown as Partial<Config>`
const tailwindTemplateJs = (configName: string) => `${configName}`

export async function addTailwindConfigTypeImport(sourceFile: SourceFile, scriptKind: ScriptKind) {
  if (scriptKind !== ScriptKind.TS) {
    return sourceFile
  }
  const configImport = sourceFile.getImportDeclaration((importDeclaration) => {
    return (
      importDeclaration.getNamedImports().some((namedImport) => namedImport.getName() === "Config") &&
      importDeclaration.getModuleSpecifierValue() === "tailwindcss"
    )
  })

  if (!configImport) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: "tailwindcss",
      namedImports: ["Config"],
      isTypeOnly: true,
    })
  }

  return sourceFile
}

export async function addPresetImports(sourceFile: SourceFile, presets: Preset[]) {
  for (const preset of presets) {
    if (
      sourceFile.getImportDeclaration((importDeclaration) => {
        return (
          importDeclaration.getDefaultImport() !== null && importDeclaration.getModuleSpecifierValue() === preset.path
        )
      })
    ) {
      return sourceFile
    }

    sourceFile.addImportDeclaration({
      moduleSpecifier: preset.path,
      defaultImport: preset.importName,
    })
  }

  return sourceFile
}

export async function addTailwindConfigPresets(
  configObject: ObjectLiteralExpression,
  presets: Preset[],
  scriptKind: ScriptKind,
) {
  const quoteChar = _getQuoteChar(configObject)

  // Update presets property
  const existingProperty =
    configObject.getProperty("presets") ?? configObject.getProperty(`${quoteChar}presets${quoteChar}`)

  if (!existingProperty) {
    // Doesn't exist, so add it
    const newProperty = {
      name: "presets",
      initializer: `[${presets
        .map((preset) =>
          scriptKind === ScriptKind.TS ? tailwindTemplateTs(preset.importName) : tailwindTemplateJs(preset.importName),
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
            ? tailwindTemplateTs(presetsItem.importName)
            : tailwindTemplateJs(presetsItem.importName)

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
