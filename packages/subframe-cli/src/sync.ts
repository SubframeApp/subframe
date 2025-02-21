import { Command } from "commander"
import { mkdir, readFile, writeFile, rm } from "node:fs/promises"
import { oraPromise } from "ora"
import { join, dirname } from "node:path"
import { IGNORE_UPDATE_KEYWORD, CodeGenFile } from "@subframe/shared"
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

      await installDependencies(cwd)

      console.log(
        `Tip: You can ignore any updates for a specific file by adding the following comment anywhere in the file:\n// ${IGNORE_UPDATE_KEYWORD}\n`,
      )

      // Ensure the root folder exists in case they deleted it.
      const rootPath = join(cwd, localSyncSettings.directory)
      await mkdir(rootPath, { recursive: true })

      /**
       * Removing all existing files and making map of files to ignore
       */
      const allAbsFilePaths = await getAllAbsFilePaths(rootPath)
      const fileNamesToIgnore = new Set<string>()
      await Promise.all(
        allAbsFilePaths.map(async (fileName) => {
          const file = await readFile(fileName)

          if (isFileContentsWriteable(file)) {
            // when generating all, we clear out the directory
            if (!components.length) {
              return rm(fileName)
            }
          } else {
            fileNamesToIgnore.add(fileName)
            console.log(`Ignoring file: ${fileName}`)
          }
        }),
      )

      /**
       * Writing the new changes
       */
      await Promise.all(
        definitionFiles.map(async ({ file, folderName }: { file: CodeGenFile; folderName: string }) => {
          const absPath = join(rootPath, folderName, file.fileName)
          if (fileNamesToIgnore.has(absPath)) {
            return null
          }

          // make the directory, if it doesn't exist yet
          await mkdir(dirname(absPath), { recursive: true })

          return writeFile(absPath, file.contents)
        }),
      )

      // non-folder files
      await Promise.all(
        otherFiles.map((file: CodeGenFile) => {
          const absPath = join(rootPath, file.fileName)
          if (fileNamesToIgnore.has(absPath)) {
            return null
          }

          return writeFile(absPath, file.contents)
        }),
      )

      console.timeEnd(SUBFRAME_SYNC_MESSAGE)
    } catch (err: any) {
      console.error(err)
      await cliLogger.trackWarningAndFlush("[CLI]: sync uncaught error", { error: err.toString() })
      await cliLogger.logExceptionAndFlush(err)
    }
  })
