import { Command } from "commander"
import fs from "fs"
import { oraPromise } from "ora"
import path from "path"
import { getAccessToken } from "./access-token"
import { apiInitProject, apiUpdateImportAlias } from "./api-endpoints"
import { localSyncSettings } from "./common"
import { SUBFRAME_INIT_MESSAGE } from "./constants"
import { installDependencies } from "./install-dependencies"
import { makeCLILogger } from "./logger/logger-cli"
import { prepareProject } from "./setup/prepare-project"
import { setupTailwindConfig } from "./setup-tailwind-config"
import { setupSyncSettings } from "./sync-settings"

export const initCommand = new Command()
  .name("init")
  .description("initializes Subframe in your local project")
  .option("-d, --dir <path>", "directory you want to sync your Subframe components to")
  .option("-p, --projectId <projectId>", "project id to run sync with")
  .action(async (opts) => {
    const cliLogger = makeCLILogger()

    try {
      const { projectPath } = await prepareProject(cliLogger)

      const truncatedProjectId = opts.projectId
      const accessToken = await getAccessToken()

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

      const { importAlias: rawImportAlias, directory } = await setupSyncSettings(projectPath, {
        directory: opts.dir ?? localSyncSettings?.directory,
        importAlias: localSyncSettings?.importAlias,
        projectId: opts.projectId ?? localSyncSettings?.projectId,
      })

      // strip /* which is used for tsconfig.json
      const importAlias = rawImportAlias.endsWith("/*") ? rawImportAlias.slice(0, -2) : rawImportAlias

      await installDependencies(projectPath)

      // Ensure the root folder exists.
      const rootPath = path.join(projectPath, directory)
      await fs.promises.mkdir(rootPath, { recursive: true })

      const absPath = path.join(rootPath, styleFile.fileName)
      await fs.promises.writeFile(absPath, styleFile.contents)

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

      if (cssType === "tailwind") {
        await setupTailwindConfig(projectPath, rootPath)
      }

      console.timeEnd(SUBFRAME_INIT_MESSAGE)
    } catch (err: any) {
      console.error(err)
      await cliLogger.trackWarningAndFlush("CLI init: uncaught error", { error: err.toString() })
      await cliLogger.logExceptionAndFlush(err)
    }
  })
