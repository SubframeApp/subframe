import degit from "degit"
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

  const emitter = degit(`SubframeApp/subframe/starter-kits/${getStarterKitName(type, cssType)}`)
  await emitter.clone(`${name}`)

  const projectPath = join(cwd, name)
  spinner.text = `Initializing git repository...`
  await tryGitInit(projectPath)

  const packageJsonPath = join(projectPath, "package.json")
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"))
  packageJson.name = name
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))

  spinner.succeed(`Successfully created ${name} at ${projectPath}`)

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
