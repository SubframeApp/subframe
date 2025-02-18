import degit from "degit"
import fs from "fs"
import ora from "ora"
import path from "path"
import prompts from "prompts"
import { cwd } from "../common"
import { CLILogger } from "../logger/logger-cli"
import { highlight } from "../output/format"
import { tryGitInit } from "../utils/git"

async function cloneStarterKit({ name, type }: { name: string; type: string }) {
  const spinner = ora(`Cloning starter kit...`).start()
  const emitter = degit(`SubframeApp/subframe/starter-kits/${type}`)
  await emitter.clone(name)

  const projectPath = path.join(cwd, name)
  spinner.text = `Initializing git repository...`
  await tryGitInit(projectPath)

  const packageJsonPath = path.join(projectPath, "package.json")
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
  packageJson.name = name
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  spinner.succeed(`Successfully created ${name} at ${projectPath}`)

  return projectPath
}

export async function prepareProject(cliLogger: CLILogger): Promise<{ projectPath: string }> {
  // No package.json in current directory - assume they need to set up a new project.
  if (!fs.existsSync(path.resolve(cwd, "package.json"))) {
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
