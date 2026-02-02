import { downloadTemplate } from "@bluwy/giget-core"
import { readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import ora from "ora"
import prompts from "prompts"
import { coerce, gte } from "semver"
import { cwd } from "../common"
import { CLILogger } from "../logger/logger-cli"
import { highlight } from "../output/format"
import { abortOnState } from "../prompt-helpers"
import { exists } from "../utils/fs"
import { tryGitInit } from "../utils/git"
import { getInstalledPackageVersion } from "../utils/package-managers"

// NOTE: hardcoded based on the starter kit templates
function getGlobalCssPath(type: "astro" | "vite" | "nextjs"): string {
  switch (type) {
    case "vite":
      return "src/index.css"
    case "nextjs":
      return "src/app/globals.css"
    case "astro":
      return "src/styles/global.css"
    default:
      throw new Error(`Invalid template type: ${type}`)
  }
}

async function detectTailwindVersion(projectPath: string): Promise<"tailwind" | "tailwind-v4" | null> {
  const versionString = await getInstalledPackageVersion("tailwindcss", projectPath)
  if (!versionString) {
    return null
  }

  const version = coerce(versionString)
  if (!version) {
    return null
  }

  if (gte(version, "4.0.0")) {
    return "tailwind-v4"
  } else if (gte(version, "3.0.0")) {
    return "tailwind"
  }

  return null
}

async function cloneStarterKit({
  name,
  type,
  cssType,
}: {
  name: string
  type: "astro" | "vite" | "nextjs"
  cssType: "tailwind" | "tailwind-v4"
}) {
  const projectPath = join(cwd, name)

  if (await exists(projectPath)) {
    throw new Error(
      `Target directory ${name} already exists. Please choose a different name or remove the existing directory.`,
    )
  }

  const spinner = ora(`Cloning starter kit...`).start()

  function getStarterKitName(type: string, cssType: "tailwind" | "tailwind-v4") {
    switch (cssType) {
      case "tailwind":
        return type
      case "tailwind-v4":
        return `${type}-${cssType}`
      default:
        throw new Error(`Invalid CSS type: ${cssType}`)
    }
  }

  try {
    await downloadTemplate(`SubframeApp/subframe/starter-kits/${getStarterKitName(type, cssType)}`, {
      cwd,
      dir: name,
    })

    spinner.text = `Initializing git repository...`
    await tryGitInit(projectPath)

    const packageJsonPath = join(projectPath, "package.json")
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"))
    packageJson.name = name
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

    spinner.succeed(`Successfully created ${name} at ${projectPath}`)
  } catch (error) {
    spinner.fail("Failed to clone starter kit")
    throw error
  }

  return projectPath
}

export type StyleInfo = { cssType: "tailwind" } | { cssType: "tailwind-v4"; globalCssPath?: string }

async function validateName(value: string): Promise<string | boolean> {
  if (value.length > 128) {
    return `Name should be less than 128 characters.`
  }
  const projectPath = join(cwd, value)
  if (await exists(projectPath)) {
    return `Target directory ${value} already exists. Please choose a different name.`
  }
  return true
}

export async function prepareProject(
  cliLogger: CLILogger,
  options: { template?: "vite" | "nextjs" | "astro"; name?: string; cssType?: "tailwind" | "tailwind-v4" },
): Promise<{ projectPath: string; didCreateNewProject: boolean; styleInfo: StyleInfo }> {
  // No package.json in current directory - assume they need to set up a new project.
  if (options.template !== undefined || !(await exists(resolve(cwd, "package.json")))) {
    prompts.override({
      type: options.template,
      name: options.name,
      cssType: options.cssType,
    })

    // NOTE: We need to pre-validate the name if it was provided because otherwise the overrides will not work with the
    // async validation function.
    const providedNameValidateResult = options.name ? await validateName(options.name) : false

    const { type, name, cssType } = await prompts([
      {
        type: "select",
        name: "type",
        message: `The path ${highlight(
          cwd,
        )} does not contain a package.json file.\n  Would you like to start a new project?`,
        choices: [
          { title: "Next.js", value: "nextjs" },
          { title: "Vite", value: "vite" },
          { title: "Astro", value: "astro" },
        ],
        initial: 0,
        onState: abortOnState,
      },
      {
        type: "text",
        name: "name",
        message: "What is your project named?",
        initial: "my-app",
        format: (value: string) => value.trim(),
        onState: abortOnState,
        validate: options.name ? () => providedNameValidateResult : validateName,
      },
      {
        type: "select",
        name: "cssType",
        message: "What version of Tailwind CSS do you want to use?",
        choices: [
          { title: "Tailwind v3", value: "tailwind" },
          { title: "Tailwind v4", value: "tailwind-v4" },
        ],
        initial: 0,
        onState: abortOnState,
      },
    ])

    const projectPath = await cloneStarterKit({ name, type, cssType })
    await cliLogger.trackEventAndFlush({ type: "cli:starter-kit_cloned", framework: type, cssType })

    const styleInfo: StyleInfo =
      cssType === "tailwind"
        ? { cssType: "tailwind" }
        : { cssType: "tailwind-v4", globalCssPath: getGlobalCssPath(type) }

    return { projectPath, didCreateNewProject: true, styleInfo }
  }

  const incomingOrDetectedCssType = options.cssType ?? (await detectTailwindVersion(cwd))
  const { cssType } = incomingOrDetectedCssType
    ? { cssType: incomingOrDetectedCssType }
    : await prompts({
        type: "select",
        name: "cssType",
        message: "What version of Tailwind CSS are you using?",
        choices: [
          { title: "Tailwind v3", value: "tailwind" },
          { title: "Tailwind v4", value: "tailwind-v4" },
        ],
        initial: 0,
        onState: abortOnState,
      })

  return {
    projectPath: cwd,
    didCreateNewProject: false,
    styleInfo: { cssType },
  }
}
