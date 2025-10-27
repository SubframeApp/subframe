import { Command } from "@commander-js/extra-typings"
import { join } from "node:path"
import {
  COMMAND_ALL_KEY,
  COMMAND_ALL_KEY_SHORT,
  COMMAND_INSTALL_KEY,
  COMMAND_INSTALL_KEY_SHORT,
  COMMAND_PROJECT_ID_KEY,
  COMMAND_PROJECT_ID_KEY_SHORT,
} from "shared/constants"
import { TruncatedProjectId } from "shared/types"
import { getAccessToken } from "./access-token"
import { cwd } from "./common"
import { localSyncSettings } from "./common"
import { MALFORMED_INIT_MESSAGE, SUBFRAME_SYNC_MESSAGE, WRONG_PROJECT_MESSAGE } from "./constants"
import { installDependencies } from "./install-dependencies"
import { makeCLILogger } from "./logger/logger-cli"
import { syncComponents } from "./sync-components"

export const syncCommand = new Command()
  .name("sync")
  .description("syncs Subframe components to your local project")
  .argument("[components...]", "the components to sync")
  .option(`${COMMAND_ALL_KEY_SHORT}, ${COMMAND_ALL_KEY}`, "sync all components")
  .option(`${COMMAND_PROJECT_ID_KEY_SHORT}, ${COMMAND_PROJECT_ID_KEY} <projectId>`, "project id to run sync with")
  .option(`${COMMAND_INSTALL_KEY_SHORT}, ${COMMAND_INSTALL_KEY}`, "install dependencies after syncing")
  .action(async (components, opts) => {
    const cliLogger = makeCLILogger()

    try {
      if (localSyncSettings?.projectId && opts.projectId && localSyncSettings.projectId !== opts.projectId) {
        await cliLogger.trackWarningAndFlush("[CLI]: sync project id mismatch")
        console.error(WRONG_PROJECT_MESSAGE)
        process.exit(1)
      }

      if (!localSyncSettings) {
        console.error(MALFORMED_INIT_MESSAGE)
        process.exit(1)
      }

      const accessToken = await getAccessToken()

      // strip /* which is used for tsconfig.json
      const importAlias = localSyncSettings.importAlias.endsWith("/*")
        ? localSyncSettings.importAlias.slice(0, -2)
        : localSyncSettings.importAlias

      console.time(SUBFRAME_SYNC_MESSAGE)

      const projectId = (opts.projectId as TruncatedProjectId | undefined) || localSyncSettings.projectId

      const syncDirectory = join(cwd, localSyncSettings.directory)
      await syncComponents({
        components,
        projectId,
        accessToken,
        importAlias,
        syncDirectory,
        cssType: localSyncSettings.cssType ?? "tailwind",
      })

      await installDependencies(cwd, opts)

      console.timeEnd(SUBFRAME_SYNC_MESSAGE)
    } catch (err: any) {
      console.error(err)
      await cliLogger.trackWarningAndFlush("[CLI]: sync uncaught error", { error: err.toString() })
      await cliLogger.logExceptionAndFlush(err)
    }
  })
