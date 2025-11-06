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

  const starterKitName = getStarterKitName(type, cssType)
  const repoPath = `SubframeApp/subframe/starter-kits/${starterKitName}`

  try {
    const emitter = degit(repoPath, {
      cache: false,
      force: true,
      verbose: false,
    })

    // Save original environment to restore later
    const originalEnv = {
      GIT_TERMINAL_PROMPT: process.env.GIT_TERMINAL_PROMPT,
      GIT_ASKPASS: process.env.GIT_ASKPASS,
      SSH_ASKPASS: process.env.SSH_ASKPASS,
      GIT_CONFIG_GLOBAL: process.env.GIT_CONFIG_GLOBAL,
      GIT_CONFIG_SYSTEM: process.env.GIT_CONFIG_SYSTEM,
    }

    try {
      // Prevent git from using user's config that might have SSH URL rewriting
      // This prevents hanging when user has git configured to use SSH with locked keys
      // By setting these to /dev/null, git won't read any config files
      process.env.GIT_CONFIG_GLOBAL = "/dev/null"
      process.env.GIT_CONFIG_SYSTEM = "/dev/null"

      // Defense in depth: also prevent credential prompting
      process.env.GIT_TERMINAL_PROMPT = "0"
      process.env.GIT_ASKPASS = ""
      process.env.SSH_ASKPASS = ""

      // Add timeout as final safety net
      // Even with config disabled, add timeout in case of network issues
      const CLONE_TIMEOUT = 120000 // 2 minutes
      await Promise.race([
        emitter.clone(`${name}`),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Clone operation timed out after 2 minutes")), CLONE_TIMEOUT),
        ),
      ])
    } finally {
      // Restore original environment variables
      for (const [key, value] of Object.entries(originalEnv)) {
        if (value === undefined) {
          delete process.env[key]
        } else {
          process.env[key] = value
        }
      }
    }
  } catch (error: any) {
    spinner.fail("Failed to clone starter kit")

    // Provide helpful error messages
    if (error.message?.includes("timed out")) {
      console.error("\nThe clone operation timed out. This could be due to:")
      console.error("  • Slow network connection")
      console.error("  • Git configured to use SSH without proper authentication")
      console.error("  • Firewall or proxy blocking the connection")
      console.error("\nIf you have git configured to use SSH for all connections,")
      console.error("make sure your SSH keys are unlocked and ssh-agent is running.")
      console.error("\nYou can check your git config with:")
      console.error('  git config --global --get-regexp url')
    } else if (error.code === "MISSING_REF" || error.message?.includes("HEAD")) {
      console.error("\nFailed to resolve repository reference. This could be due to:")
      console.error("  • Network connectivity issues")
      console.error("  • Git authentication problems")
      console.error("  • SSH key not unlocked or ssh-agent not running")
      console.error("\nIf you have URL rewriting configured (e.g., HTTPS → SSH),")
      console.error("ensure your SSH keys are properly set up and accessible.")
    } else {
      console.error(`\nError: ${error.message}`)
    }

    console.error("\nFor more help, visit: https://github.com/SubframeApp/subframe/issues/73")
    throw error
  }

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
