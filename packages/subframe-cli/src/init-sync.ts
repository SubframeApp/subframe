import { COMMAND_NO_SYNC_KEY, COMMAND_SYNC_KEY } from "shared/constants"
import { TruncatedProjectId } from "shared/types"
import { ask } from "./interactive"
import { CLILogger } from "./logger/logger-cli"
import { syncComponents } from "./sync-components"

export async function initSync(
  cliLogger: CLILogger,
  syncDirectory: string,
  projectId: TruncatedProjectId | undefined,
  accessToken: string,
  importAlias: string,
  cssType: "tailwind" | "tailwind-v4",
  opts: { sync?: boolean },
) {
  const shouldSync = await ask<boolean>(
    {
      type: "confirm",
      name: "sync",
      initial: true,
      message: "Would you like to sync all of your Subframe components?",
    },
    { override: opts.sync, requiredHint: `Pass ${COMMAND_SYNC_KEY} or ${COMMAND_NO_SYNC_KEY}.` },
  )

  if (!shouldSync) {
    return
  }

  await syncComponents({ cliLogger, components: [], projectId, accessToken, importAlias, syncDirectory, cssType })
}
