import { Command } from "@commander-js/extra-typings"
import {
  COMMAND_ALL_KEY,
  COMMAND_ALL_KEY_SHORT,
  COMMAND_INSTALL_KEY,
  COMMAND_INSTALL_KEY_SHORT,
  COMMAND_PROJECT_ID_KEY,
  COMMAND_PROJECT_ID_KEY_SHORT,
} from "shared/constants"
import { getAccessToken } from "./access-token"
import { cwd } from "./common"
import { SUBFRAME_SYNC_MESSAGE } from "./constants"
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
      const accessToken = await getAccessToken()

      console.time(SUBFRAME_SYNC_MESSAGE)

      await syncComponents(components, opts, accessToken, cwd)
      console.clear()

      await installDependencies(cwd, opts)

      console.timeEnd(SUBFRAME_SYNC_MESSAGE)
    } catch (err: any) {
      console.error(err)
      await cliLogger.trackWarningAndFlush("[CLI]: sync uncaught error", { error: err.toString() })
      await cliLogger.logExceptionAndFlush(err)
    }
  })

export type SyncOptions = ReturnType<typeof syncCommand.opts>
