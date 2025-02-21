import { Command, Option } from "@commander-js/extra-typings"
import { oraPromise } from "ora"
import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import { getAccessToken, verifyTokenWithOra } from "./access-token"
import { apiInitProject, apiUpdateImportAlias } from "./api-endpoints"
import { localSyncSettings } from "./common"
import { SUBFRAME_INIT_MESSAGE } from "./constants"
import { installDependencies } from "./install-dependencies"
import { makeCLILogger } from "./logger/logger-cli"
import { prepareProject } from "./setup/prepare-project"
import { setupTailwindConfig } from "./setup-tailwind-config"
import { setupSyncSettings } from "./sync-settings"
import { mkdirIfNotExist } from "./utils/fs"

export type InitCommandOptions = ReturnType<typeof initCommand.opts>

export const initCommand = new Command()
  .name("init")
  .description("Initializes Subframe in your local project or sets up a new one for you")
  .option("-z, --auth-token <auth-token>", "auth token to use")
  .addOption(
    new Option("-c, --create <template>", "create a new project with a specific template").choices([
      "vite",
      "nextjs",
      "astro",
    ]),
  )
  .option("-n, --name <name>", "name of the project to create")
  .option("-d, --dir <path>", "directory you want to sync your Subframe components to")
  .option("-p, --projectId <projectId>", "project id to run sync with")
  .option("-i, --install", "install dependencies after initializing")
  .option("-t, --tailwind", "setup tailwind config")
  .option("-a, --alias <alias>", "import alias to use")

initCommand.action(async (opts) => {
  const cliLogger = makeCLILogger()

  try {
    const { projectPath } = await prepareProject(cliLogger, opts)

    const truncatedProjectId = opts.projectId
    let accessToken = opts.authToken
    if (accessToken) {
      await verifyTokenWithOra(accessToken)
      throw new Error("Failed to authenticate with provided token")
    } else if (!accessToken) {
      accessToken = await getAccessToken()
    }

    console.time(SUBFRAME_INIT_MESSAGE)

    const { styleFile, cssType, oldImportAlias } = await oraPromise(
      apiInitProject({
        token: accessToken,
        truncatedProjectId,
      }),
      {
        text: "Initializing Subframe project",
        failText: "Failed to initialize Subframe project",
      },
    )

    const { importAlias: rawImportAlias, directory } = await setupSyncSettings(
      projectPath,
      {
        directory: opts.dir ?? localSyncSettings?.directory,
        importAlias: localSyncSettings?.importAlias,
        projectId: opts.projectId ?? localSyncSettings?.projectId,
      },
      opts,
    )

    // strip /* which is used for tsconfig.json
    const importAlias = rawImportAlias.endsWith("/*") ? rawImportAlias.slice(0, -2) : rawImportAlias

    // TODO(Chris): Also ask for project ID and add logic for that

    await installDependencies(projectPath, opts)

    // Ensure the root folder exists.
    const rootPath = join(projectPath, directory)
    await mkdirIfNotExist(rootPath)

    const absPath = join(rootPath, styleFile.fileName)
    await writeFile(absPath, styleFile.contents)

    if (oldImportAlias !== importAlias) {
      console.log(`Change in import alias detected. Before: "${oldImportAlias}", After: "${importAlias}"`)
      console.log(
        `Syncing changes to your project settings. Any code you copy / paste from Subframe will now use the new import alias like this: import { Button } from "${importAlias}/components/Button";`,
      )

      try {
        await oraPromise(
          apiUpdateImportAlias({
            token: accessToken,
            truncatedProjectId,
            importAlias,
          }),
          {
            text: "Updating import alias",
            successText: "Import alias updated",
            failText: "Failed to update import alias",
          },
        )
      } catch (error) {
        // Note: don't block init if this fails
        console.error(error)
      }
    }

    if (cssType !== "tailwind") {
      throw new Error("How?")
    }
    await setupTailwindConfig(projectPath, rootPath)

    console.timeEnd(SUBFRAME_INIT_MESSAGE)
  } catch (err: any) {
    console.error(err)
    await cliLogger.trackWarningAndFlush("CLI init: uncaught error", { error: err.toString() })
    await cliLogger.logExceptionAndFlush(err)
  }
})
