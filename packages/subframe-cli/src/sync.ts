import { Command } from "commander"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { oraPromise } from "ora"
import { IGNORE_UPDATE_KEYWORD } from "shared/constants"
import { getAccessToken } from "./access-token"
import { apiSyncProject } from "./api-endpoints"
import { cwd, localSyncSettings } from "./common"
import { MALFORMED_INIT_MESSAGE, SUBFRAME_SYNC_MESSAGE, WRONG_PROJECT_MESSAGE } from "./constants"
import { installDependencies } from "./install-dependencies"
import { makeCLILogger } from "./logger/logger-cli"
import { getAllAbsFilePaths, isFileContentsWriteable } from "./utils/files"

export const syncCommand = new Command()
  .name("sync")
  .description("syncs Subframe components to your local project")
  .argument("[components...]", "the components to sync")
  .option("-a, --all", "sync all components")
  .option("-p, --projectId <projectId>", "project id to run sync with")
  .option("-i, --install", "install dependencies after syncing")
  .action(async (components, opts) => {
    const cliLogger = makeCLILogger()

    try {
      if (localSyncSettings?.projectId && opts.projectId && localSyncSettings.projectId !== opts.projectId) {
        await cliLogger.trackWarningAndFlush("[CLI]: sync project id mismatch")
        console.error(WRONG_PROJECT_MESSAGE)
        process.exit(1)
      }

      const truncatedProjectId = opts.projectId ?? localSyncSettings?.projectId

      if (!localSyncSettings) {
        await cliLogger.trackWarningAndFlush("[CLI] sync local sync settings do not exist")
        console.error(MALFORMED_INIT_MESSAGE)
        process.exit(1)
      }

      const accessToken = await getAccessToken()

      // strip /* which is used for tsconfig.json
      const importAlias = localSyncSettings.importAlias.endsWith("/*")
        ? localSyncSettings.importAlias.slice(0, -2)
        : localSyncSettings.importAlias

      console.time(SUBFRAME_SYNC_MESSAGE)

      const { definitionFiles, otherFiles } = await oraPromise(
        apiSyncProject({
          token: accessToken,
          truncatedProjectId,
          components,
          importAlias,
        }),
        {
          text: "Syncing Subframe components",
          failText: "Failed to sync Subframe components",
        },
      )

      console.clear()

      await installDependencies(cwd, { install: opts.install })

      console.log(
        `Tip: You can ignore any updates for a specific file by adding the following comment anywhere in the file:\n// ${IGNORE_UPDATE_KEYWORD}\n`,
      )

      // Ensure the root folder exists in case they deleted it.
      const rootPath = join(cwd, localSyncSettings.directory)
      await mkdir(rootPath, { recursive: true })

      /**
       * Making map of files to write
       */
      const filesToWrite: { [absFilePath: string]: string } = {}
      definitionFiles.forEach(({ file, folderName }) => {
        filesToWrite[join(rootPath, folderName, file.fileName)] = file.contents
      })
      otherFiles.forEach((file) => {
        filesToWrite[join(rootPath, file.fileName)] = file.contents
      })

      /**
       * Removing all existing files and making map of files to ignore
       */
      const allAbsFilePaths = await getAllAbsFilePaths(rootPath)
      const fileAbsPathsToIgnore = new Set<string>()
      await Promise.all(
        allAbsFilePaths.map(async (fileName) => {
          const file = await readFile(fileName)

          if (!isFileContentsWriteable(file)) {
            fileAbsPathsToIgnore.add(fileName)
            console.log(`Ignoring file: ${fileName}`)
          } else if (filesToWrite[fileName] && filesToWrite[fileName] === file.toString()) {
            // No changes, so can ignore
            fileAbsPathsToIgnore.add(fileName)
          } else if (!components.length) {
            // when generating all, we clear out the directory
            return rm(fileName)
          }
        }),
      )

      /**
       * Writing the files with changes
       */
      await Promise.all(
        Object.entries(filesToWrite).map(async ([absFilePath, contents]) => {
          if (fileAbsPathsToIgnore.has(absFilePath)) {
            return null
          }

          // make the directory, if it doesn't exist yet
          await mkdir(dirname(absFilePath), { recursive: true })

          return writeFile(absFilePath, contents)
        }),
      )

      console.timeEnd(SUBFRAME_SYNC_MESSAGE)
    } catch (err: any) {
      console.error(err)
      await cliLogger.trackWarningAndFlush("[CLI]: sync uncaught error", { error: err.toString() })
      await cliLogger.logExceptionAndFlush(err)
    }
  })
