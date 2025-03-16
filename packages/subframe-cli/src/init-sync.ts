import prompts from "prompts"
import { syncComponents } from "./sync-components"
import { abortOnState } from "./sync-helpers"

export async function initSync(
  syncDirectory: string,
  projectId: string | undefined,
  accessToken: string,
  importAlias: string,
  opts: { sync?: boolean },
) {
  prompts.override({
    sync: opts.sync,
  })

  const response = await prompts({
    type: "confirm",
    name: "sync",
    initial: true,
    message: ["Would you like to directly sync your Subframe components?"].join("\n"),
    onState: abortOnState,
  })

  if (!response.sync) {
    return
  }

  await syncComponents([], projectId, accessToken, importAlias, syncDirectory)
}
