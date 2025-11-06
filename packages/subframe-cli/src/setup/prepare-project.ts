import { downloadTemplate } from "@bluwy/giget-core"
import { readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import ora from "ora"
import prompts from "prompts"
import { cwd } from "../common"
import { CLILogger } from "../logger/logger-cli"
import { highlight } from "../output/format"
import { exists } from "../utils/fs"
import { tryGitInit } from "../utils/git"

async function cloneStarterKit({
  name,
  type,
  cssType,
}: {
  name: string
  type: "astro" | "vite" | "nextjs"
  cssType: "tailwind" | "tailwind-v4"
}) {
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

  const starterKitName = getStarterKitName(type, cssType)
  // giget-core uses github:owner/repo#subdirectory syntax
  const templateTarget = `github:SubframeApp/subframe#starter-kits/${starterKitName}`
  const projectPath = join(cwd, name)

  try {
    // giget-core downloads tarballs directly via HTTP, avoiding git commands entirely
    // This prevents hanging issues with SSH git configurations
    await downloadTemplate(templateTarget, {
      force: true,
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
  } catch (error: any) {
    spinner.fail("Failed to clone starter kit")

    // Provide helpful error messages
    console.error(`\nError: ${error.message}`)
    console.error("\nThis could be due to:")
    console.error("  • Network connectivity issues")
    console.error("  • Firewall or proxy blocking the connection")
    console.error("  • Invalid template name")
    console.error("\nFor more help, visit: https://github.com/SubframeApp/subframe/issues/73")

    throw error
  }

  return projectPath
}

export async function prepareProject(
  cliLogger: CLILogger,
  options: { template?: "vite" | "nextjs" | "astro"; name?: string; cssType?: "tailwind" | "tailwind-v4" },
): Promise<{ projectPath: string }> {
  // No package.json in current directory - assume they need to set up a new project.
  if (!(await exists(resolve(cwd, "package.json"))) || options.template !== undefined) {
    prompts.override({
      type: options.template,
      name: options.name,
    })
    const { type, name } = await prompts([
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
      },
      {
        type: "text",
        name: "name",
        message: "What is your project named?",
        initial: "my-app",
        format: (value: string) => value.trim(),
        validate: (value: string) => (value.length > 128 ? `Name should be less than 128 characters.` : true),
      },
    ])

    // TODO: Add an prompt to ask if they want to use tailwind v3 vs. v4.
    const projectPath = await cloneStarterKit({ name, type, cssType: options.cssType ?? "tailwind" })
    await cliLogger.trackEventAndFlush({ type: "cli:starter-kit_cloned", framework: type })

    return { projectPath }
  }

  return { projectPath: cwd }
}
