import { resolve } from "node:path"
import prompts from "prompts"
import { syncFunction } from "./sync"
import { abortOnState } from "./sync-helpers"

export async function initSync(
  projectPath: string,
  projectId: string | undefined,
  opts: { sync?: boolean; install?: true },
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

  const cwd = resolve(projectPath)

  await syncFunction(
    [],
    {
      projectId,
      all: true,
      install: opts.install,
    },
    cwd,
  )
}
