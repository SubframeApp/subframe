import prompts from "prompts"
import { TruncatedProjectId } from "shared/types"
import { CLILogger } from "./logger/logger-cli"
import { syncComponents } from "./sync-components"
import { abortOnState } from "./sync-helpers"

export async function initSync(
  cliLogger: CLILogger,
  syncDirectory: string,
  projectId: TruncatedProjectId | undefined,
  accessToken: string,
  importAlias: string,
  cssType: "tailwind" | "tailwind-v4",
  opts: { sync?: boolean },
) {
  prompts.override({
    sync: opts.sync,
  })

  const response = await prompts({
    type: "confirm",
    name: "sync",
    initial: true,
    message: ["Would you like to sync all of your Subframe components?"].join("\n"),
    onState: abortOnState,
  })

  if (!response.sync) {
    return
  }

  await syncComponents({ cliLogger, components: [], projectId, accessToken, importAlias, syncDirectory, cssType })
}
