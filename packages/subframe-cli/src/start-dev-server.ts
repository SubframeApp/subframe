import { execa } from "execa"
import path from "node:path"
import prompts from "prompts"
import { abortOnState } from "./prompt-helpers"
import { getInstallCommand, getPackageManager, getRunDevCommand, type PackageManager } from "./utils/package-managers"

export async function startDevServer(projectPath: string, { didInstall }: { didInstall: boolean }): Promise<void> {
  const packageManager = await getPackageManager(projectPath)

  // If they didn't want to install dependencies, just print the instructions and return
  if (!didInstall) {
    printInstructions(projectPath, packageManager, { didInstall })
    return
  }

  const response = await prompts({
    type: "confirm",
    name: "startDev",
    initial: true,
    message: "Would you like to start the dev server?",
    onState: abortOnState,
  })

  if (response.startDev) {
    console.log("Starting dev server...")
    const devCommand = getRunDevCommand(packageManager)
    await execa(devCommand[0], devCommand.slice(1), {
      cwd: projectPath,
      stdio: "inherit",
    })
  } else {
    printInstructions(projectPath, packageManager, { didInstall })
  }
}

function printInstructions(
  projectPath: string,
  packageManager: PackageManager,
  { didInstall }: { didInstall: boolean },
): void {
  console.log()
  console.log("Done. Now run:")
  const cdProjectName = path.relative(process.cwd(), projectPath)

  if (cdProjectName) {
    const cdCommand = cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
    console.log(`  cd ${cdCommand}`)
  }

  if (!didInstall) {
    console.log(`  ${getInstallCommand(packageManager).join(" ")}`)
  }

  console.log(`  ${getRunDevCommand(packageManager).join(" ")}`)
}
