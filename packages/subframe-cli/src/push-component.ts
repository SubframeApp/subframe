import { Command } from "@commander-js/extra-typings"
import { readFile } from "node:fs/promises"
import { isAbsolute, join } from "node:path"
import { oraPromise } from "ora"
import { COMMAND_AUTH_TOKEN_KEY, COMMAND_AUTH_TOKEN_KEY_SHORT } from "shared/constants"
import { TruncatedProjectId } from "shared/types"
import { resolveAccessToken } from "./access-token"
import { apiPushComponent } from "./api-endpoints"
import { cwd, localSyncSettings } from "./common"
import { highlight } from "./output/format"
import { runCommand } from "./run-command"

export const pushComponentCommand = new Command()
  .name("push-component")
  .description("pushes a component to Subframe [EXPERIMENTAL]")
  .argument("<component-file-path>", "path to the component file to push")
  .requiredOption("-p, --project-id <projectId>", "project ID to push the component to")
  .option(`${COMMAND_AUTH_TOKEN_KEY_SHORT}, ${COMMAND_AUTH_TOKEN_KEY} <auth-token>`, "auth token to use")
  .option("-s, --skip-normalize", "skip normalizing the component file")
  .action(async (componentFilePath, opts) =>
    runCommand("push-component", async (cliLogger) => {
      const { token: accessToken } = await resolveAccessToken(cliLogger, {
        authTokenFlag: opts.authToken,
        teamId: localSyncSettings?.teamId,
      })

      // read file from path
      const resolvedPath = isAbsolute(componentFilePath) ? componentFilePath : join(cwd, componentFilePath)
      const componentFile = await readFile(resolvedPath, "utf8")

      // look for export statement for component name, e.g. "export const Button = ..."
      const componentName = componentFile.match(/export const (\w+) = /)?.[1]
      if (!componentName) {
        throw new Error("Failed to find component name in component file")
      }

      await oraPromise(
        apiPushComponent(accessToken, {
          truncatedProjectId: opts.projectId as TruncatedProjectId,
          componentName,
          componentFile,
          skipNormalize: opts.skipNormalize,
        }),
        {
          text: "Pushing Subframe component",
          successText: () => `Pushed component ${highlight(componentName)}`,
          failText: (error: Error) => `Failed to push component ${highlight(componentName)}:\n${error.message}`,
        },
      )

      return { componentName, projectId: opts.projectId }
    }),
  )
