import { Command } from "@commander-js/extra-typings"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { oraPromise } from "ora"
import { getAccessToken } from "./access-token"
import { apiPushComponent } from "./api-endpoints"
import { cwd } from "./common"
import { makeCLILogger } from "./logger/logger-cli"
import { highlight } from "./output/format"

export const pushComponentCommand = new Command()
  .name("push-component")
  .description("pushes a component to Subframe")
  .argument("<component-file-path>", "path to the component file to push")
  .option("-s, --skip-normalize", "skip normalizing the component file")
  // TODO: handle this in the backend
  .option("-n, --new-component", "creating a new component")
  .action(async (componentFilePath, opts) => {
    const cliLogger = makeCLILogger()

    try {
      const accessToken = await getAccessToken(cliLogger)

      // read file from path
      const componentFile = await readFile(join(cwd, componentFilePath), "utf8")

      // look for export statement for component name, e.g. "export const Button = ButtonRoot"
      const componentName = componentFile.match(/export const (\w+) = \w+Root/)?.[1]
      if (!componentName) {
        console.log("Failed to find component name in component file")
        return
      }

      await oraPromise(
        apiPushComponent(accessToken, {
          componentName,
          componentFile,
          skipNormalize: opts.skipNormalize,
          isNewComponent: opts.newComponent,
        }),
        {
          text: "Pushing Subframe component",
          successText: () => `Pushed component ${highlight(componentName)}`,
          failText: (error: Error) => `Failed to push component ${highlight(componentName)}: ${error.message}`,
        },
      )
    } catch (err: any) {
      console.error(err)
      await cliLogger.trackWarningAndFlush("[CLI]: push-component uncaught error", { error: err.toString() })
    }
  })
