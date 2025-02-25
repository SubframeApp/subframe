import degit from "degit"
import { readFile, writeFile } from "node:fs/promises"
import ora from "ora"
import { join, resolve } from "node:path"
import prompts from "prompts"
import { cwd } from "../common"
import { CLILogger } from "../logger/logger-cli"
import { highlight } from "../output/format"
import { tryGitInit } from "../utils/git"
import { exists } from "../utils/fs"

async function cloneStarterKit({ name, type }: { name: string; type: "astro" | "vite" | "nextjs" }) {
  const spinner = ora(`Cloning starter kit...`).start()

  const emitter = degit(`SubframeApp/subframe/starter-kits/${type}`)
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
  options: { template?: "vite" | "nextjs" | "astro"; name?: string },
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

    const projectPath = await cloneStarterKit({ name, type })
    cliLogger.trackEvent({ type: "cli:starter-kit_cloned", framework: type })

    return { projectPath }
  }

  return { projectPath: cwd }
}
