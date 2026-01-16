import { Command, Option } from "@commander-js/extra-typings"
import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import { oraPromise } from "ora"
import {
  COMMAND_ALIAS_KEY,
  COMMAND_ALIAS_KEY_SHORT,
  COMMAND_AUTH_TOKEN_KEY,
  COMMAND_AUTH_TOKEN_KEY_SHORT,
  COMMAND_CSS_PATH_KEY,
  COMMAND_CSS_PATH_KEY_SHORT,
  COMMAND_CSS_TYPE_KEY,
  COMMAND_CSS_TYPE_KEY_SHORT,
  COMMAND_DIR_KEY,
  COMMAND_DIR_KEY_SHORT,
  COMMAND_INSTALL_KEY,
  COMMAND_INSTALL_KEY_SHORT,
  COMMAND_NAME_KEY,
  COMMAND_NAME_KEY_SHORT,
  COMMAND_PROJECT_ID_KEY,
  COMMAND_PROJECT_ID_KEY_SHORT,
  COMMAND_SYNC_KEY,
  COMMAND_SYNC_KEY_SHORT,
  COMMAND_TAILWIND_KEY,
  COMMAND_TAILWIND_KEY_SHORT,
  COMMAND_TEMPLATE_KEY,
} from "shared/constants"
import { TruncatedProjectId } from "shared/types"
import { getAccessToken, verifyTokenWithOra } from "./access-token"
import { apiUpdateImportAlias } from "./api-endpoints"
import { localSyncSettings } from "./common"
import { storeToken } from "./config"
import { SUBFRAME_INIT_MESSAGE } from "./constants"
import { initProject, selectProject } from "./init-project"
import { initSync } from "./init-sync"
import { installDependencies } from "./install-dependencies"
import { makeCLILogger } from "./logger/logger-cli"
import { prepareProject } from "./setup/prepare-project"
import { setupTailwindV3 } from "./setup-tailwind-v3"
import { setupTailwindV4 } from "./setup-tailwind-v4"
import { startDevServer } from "./start-dev-server"
import { setupSyncSettings } from "./sync-settings"
import { mkdirIfNotExist } from "./utils/fs"

export const initCommand = new Command()
  .name("init")
  .description("Initializes Subframe in your local project or sets up a new one for you")
  .option(`${COMMAND_AUTH_TOKEN_KEY_SHORT}, ${COMMAND_AUTH_TOKEN_KEY} <auth-token>`, "auth token to use")
  .addOption(
    new Option(`${COMMAND_TEMPLATE_KEY} <template>`, "create a new project with a specific template").choices([
      "vite",
      "nextjs",
      "astro",
    ]),
  )
  .option(`${COMMAND_NAME_KEY_SHORT}, ${COMMAND_NAME_KEY} <name>`, "name of the project to create")
  .option(
    `${COMMAND_DIR_KEY_SHORT}, ${COMMAND_DIR_KEY} <path>`,
    "directory you want to sync your Subframe components to",
  )
  .option(`${COMMAND_PROJECT_ID_KEY_SHORT}, ${COMMAND_PROJECT_ID_KEY} <projectId>`, "project id to run sync with")
  .option(`${COMMAND_INSTALL_KEY_SHORT}, ${COMMAND_INSTALL_KEY}`, "install dependencies after initializing")
  .option(`${COMMAND_TAILWIND_KEY_SHORT}, ${COMMAND_TAILWIND_KEY}`, "setup tailwind with Subframe theme")
  .option(`${COMMAND_ALIAS_KEY_SHORT}, ${COMMAND_ALIAS_KEY} <alias>`, "import alias to use")
  .option(`${COMMAND_SYNC_KEY_SHORT}, ${COMMAND_SYNC_KEY}`, "sync all components")
  .addOption(
    new Option(`${COMMAND_CSS_TYPE_KEY_SHORT}, ${COMMAND_CSS_TYPE_KEY} <cssType>`, "css type to use").choices([
      "tailwind",
      "tailwind-v4",
    ]),
  )
  .option(`${COMMAND_CSS_PATH_KEY_SHORT}, ${COMMAND_CSS_PATH_KEY} <path>`, "path to global CSS file (for Tailwind v4)")

initCommand.action(async (opts) => {
  const cliLogger = makeCLILogger()

  try {
    const { projectPath, didCreateNewProject, styleInfo } = await prepareProject(cliLogger, opts)

    let accessToken = opts.authToken
    if (accessToken) {
      const tokenWithTeam = await verifyTokenWithOra(cliLogger, accessToken)
      if (!tokenWithTeam) {
        throw new Error("Failed to authenticate with provided token")
      }
      await storeToken(cliLogger, tokenWithTeam)
    } else {
      const tokenWithTeam = await getAccessToken(cliLogger, { teamId: localSyncSettings?.teamId })
      accessToken = tokenWithTeam.token
    }

    console.time(SUBFRAME_INIT_MESSAGE)

    const projectIdFromOpts = (opts.projectId as TruncatedProjectId | undefined) ?? localSyncSettings?.projectId

    const truncatedProjectIdToUse = await selectProject({
      cliLogger,
      accessToken,
      projectIdOverride: projectIdFromOpts,
    })

    const { styleFile, oldImportAlias, projectInfo } = await initProject({
      cliLogger,
      accessToken,
      truncatedProjectId: truncatedProjectIdToUse,
      cssType: styleInfo.cssType,
    })

    const truncatedProjectId = projectInfo.truncatedProjectId

    const { importAlias: rawImportAlias, directory } = await setupSyncSettings(
      projectPath,
      {
        directory: opts.dir ?? localSyncSettings?.directory,
        importAlias: localSyncSettings?.importAlias,
        projectId: truncatedProjectId,
        teamId: projectInfo.teamId,
        cssType: styleInfo.cssType,
      },
      opts,
    )

    // strip /* which is used for tsconfig.json
    const importAlias = rawImportAlias.endsWith("/*") ? rawImportAlias.slice(0, -2) : rawImportAlias

    // Ensure the root folder exists.
    const rootPath = join(projectPath, directory)
    await mkdirIfNotExist(rootPath)

    const absPath = join(rootPath, styleFile.fileName)
    await writeFile(absPath, styleFile.contents)

    if (oldImportAlias !== importAlias) {
      console.log(`Change in import alias detected. Before: "${oldImportAlias}", After: "${importAlias}"`)
      console.log(
        `Syncing changes to your project settings. Any code you copy / paste from Subframe will now use the new import alias like this: import { Button } from "${importAlias}/components/Button";`,
      )

      try {
        await oraPromise(
          apiUpdateImportAlias(accessToken, {
            truncatedProjectId,
            importAlias,
          }),
          {
            text: "Updating import alias",
            successText: "Import alias updated",
            failText: "Failed to update import alias",
          },
        )
      } catch (error) {
        // Note: don't block init if this fails
        console.error(error)
        await cliLogger.trackWarningAndFlush("[CLI]: updateImportAlias failed", { error: error.toString() })
      }
    }

    switch (styleInfo.cssType) {
      case "tailwind":
        await setupTailwindV3({ projectPath, rootPath }, opts)
        break
      case "tailwind-v4":
        await setupTailwindV4({ projectPath, rootPath }, { globalCssPath: styleInfo.globalCssPath, ...opts })
        break
      default:
        throw new Error(`Invalid css type: ${JSON.stringify(styleInfo)}`)
    }

    const syncDirectory = join(projectPath, directory)
    await initSync(cliLogger, syncDirectory, truncatedProjectId, accessToken, importAlias, styleInfo.cssType, opts)
    const { didInstall } = await installDependencies({ cwd: projectPath, didCreateNewProject }, opts)

    console.timeEnd(SUBFRAME_INIT_MESSAGE)
    if (didCreateNewProject) {
      await startDevServer(projectPath, { didInstall })
    }
  } catch (err: any) {
    console.error(err)
    await cliLogger.trackWarningAndFlush("[CLI] init: uncaught error", { error: err.toString() })
  }
})
