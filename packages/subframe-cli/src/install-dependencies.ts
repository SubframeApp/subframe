import { execa } from "execa"
import { oraPromise } from "ora"
import prompts from "prompts"
import { coerce, lt } from "semver"
import { AUTOINSTALLED_DEPENDENCIES } from "./constants"
import { abortOnState } from "./prompt-helpers"
import {
  getInstallCommand,
  getInstalledPackageVersion,
  getInstallPackagesCommand,
  getLatestPackageVersion,
  getPackageManager,
  makePackageSpecifier,
} from "./utils/package-managers"

/**
 * Installs the dependencies that are required for Subframe to work
 *
 * - checks if the dependencies are already installed and up-to-date
 * - if not, asks the user if they want to install/update them
 * - if yes, installs/updates them
 * - if no, does nothing
 */
export async function installDependencies(
  { cwd, didCreateNewProject }: { cwd: string; didCreateNewProject: boolean },
  opts: { install?: boolean },
): Promise<{ didInstall: boolean }> {
  const toInstall = new Map<string, string>()

  for (const [packageName, packageVersion] of Object.entries(AUTOINSTALLED_DEPENDENCIES)) {
    const installedVersion = await getInstalledPackageVersion(packageName, cwd).then(coerce)
    const targetVersion = packageVersion === "latest" ? await getLatestPackageVersion(packageName) : packageVersion

    if (!installedVersion) {
      toInstall.set(packageName, targetVersion)
    } else {
      if (installedVersion === null) {
        toInstall.set(packageName, targetVersion)
        continue
      }

      if (lt(installedVersion, targetVersion)) {
        toInstall.set(packageName, targetVersion)
      }
    }
  }

  if (toInstall.size === 0 && !didCreateNewProject) {
    return { didInstall: false }
  }

  const packageSpecifiers = Array.from(toInstall.entries()).map(([packageName, packageVersion]) =>
    makePackageSpecifier(packageName, packageVersion),
  )

  prompts.override({
    install: opts.install,
  })

  const response = await prompts({
    type: "confirm",
    name: "install",
    initial: true,
    message: ["Would you like to install dependencies?"].join("\n"),
    onState: abortOnState,
  })

  if (!response.install) {
    return { didInstall: false }
  }

  const packageManager = await getPackageManager(cwd)

  await oraPromise(
    async () => {
      // Install the explicitly required dependencies like @subframe/core
      const installPackagesCommand = getInstallPackagesCommand(packageManager, packageSpecifiers)
      await execa(installPackagesCommand[0], installPackagesCommand.slice(1), {
        cwd,
      }).pipeStderr?.(process.stderr)

      // When creating a new project, we also need to install all of the dependencies in the package.json
      if (didCreateNewProject) {
        const installCommand = getInstallCommand(packageManager)
        await execa(installCommand[0], installCommand.slice(1), { cwd }).pipeStderr?.(process.stderr)
      }

      return { didInstall: true }
    },
    {
      text: `Installing dependencies with ${packageManager}`,
      failText: "Failed to install dependencies",
    },
  )

  return { didInstall: true }
}
