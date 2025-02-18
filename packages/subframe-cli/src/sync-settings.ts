import fs from "fs"
import path from "path"
import prompt from "prompts"
import { DEFAULT_SUBFRAME_TS_ALIAS, ROOT_FOLDER_NAME } from "shared/constants"
import { addAliasesToTSConfig, hasAliasSetup } from "./add-tsconfig-alias"
import { ACCESS_TOKEN_FILENAME, SUBFRAME_DIR, SYNC_SETTINGS_FILENAME } from "./constants"
import { abortOnState } from "./sync-helpers"

export interface SyncSettingsConfig {
  directory: string
  importAlias: string
  projectId?: string
}

export function getLocalSyncSettings(cwd: string): SyncSettingsConfig | null {
  try {
    const contents = fs.readFileSync(path.join(cwd, SUBFRAME_DIR, SYNC_SETTINGS_FILENAME), "utf-8")
    const parsed = JSON.parse(contents)

    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return null
    }

    return parsed
  } catch (e) {
    return null
  }
}

/**
 * Sets up the sync settings for the project
 *
 * - set up the .subframe local directory
 * - set up the sync settings file
 */
export async function setupSyncSettings(
  cwd: string,
  options: Partial<SyncSettingsConfig>,
): Promise<SyncSettingsConfig> {
  const subframeDirPath = path.join(cwd, SUBFRAME_DIR)
  const syncSettingsPath = path.join(subframeDirPath, SYNC_SETTINGS_FILENAME)

  // Note: remove after 6/1/2025 - the access token is now stored in the data directory.
  // See config.ts for more details.
  //
  // We previously added a diff to .gitignore to avoid committing .subframe/access-token to git.
  // That is no longer needed, but no need to clean that up.
  const accessTokenPath = path.join(subframeDirPath, ACCESS_TOKEN_FILENAME)
  if (fs.existsSync(accessTokenPath)) {
    fs.unlinkSync(accessTokenPath)
  }

  const tsConfigPath = path.join(cwd, "tsconfig.json")
  const subframeDirExists = fs.existsSync(subframeDirPath)

  if (!subframeDirExists) {
    const response = await prompt({
      type: "confirm",
      name: "createSubframeDir",
      initial: true,
      message: "Subframe will create a .subframe folder to manage your project settings. Continue?",
      onState: abortOnState,
    })

    if (response.createSubframeDir) {
      await fs.promises.mkdir(subframeDirPath)
    }
  }

  const config: Partial<SyncSettingsConfig> = {
    directory: options.directory,
    importAlias: options.importAlias,
    projectId: options.projectId,
  }

  if (!options.directory) {
    const response = await prompt({
      type: "text",
      name: "directory",
      initial: "./src",
      message: "Where should the Subframe components be synced to?",
      validate: (value) => {
        return fs.existsSync(path.join(cwd, value)) ? true : `Directory ${value} does not exist`
      },
      onState: abortOnState,
    })

    // NOTE: path.join will remove the trailing slash
    config.directory = "./" + path.join(response.directory, ROOT_FOLDER_NAME)
  }

  if (!options.importAlias) {
    const response = await prompt({
      type: "text",
      name: "componentsDirAlias",
      initial: `${DEFAULT_SUBFRAME_TS_ALIAS}/*`,
      message: `Configure an alias for the subframe component directory (e.g. ${DEFAULT_SUBFRAME_TS_ALIAS})`,
      validate: (value) => {
        return typeof value === "string" && value.endsWith("/*")
          ? true
          : "Alias must end with '/*' so that it matches all files in the directory"
      },
      onState: abortOnState,
    })

    if (response.componentsDirAlias && config.directory) {
      config.importAlias = response.componentsDirAlias

      const aliases = {
        /** just the one alias for now */
        [response.componentsDirAlias]: [`${config.directory}/*`],
      }

      if (fs.existsSync(tsConfigPath)) {
        /** if we detect the aliases are not setup, ask to set them up */
        const isSetup = await hasAliasSetup(tsConfigPath, aliases)
        if (!isSetup) {
          const { updateTSConfig } = await prompt({
            type: "confirm",
            name: "updateTSConfig",
            initial: true,
            message:
              "Would you like to add the alias to tsconfig.json? You can usually skip this step if you are using a vanilla NextJS setup.",
            onState: abortOnState,
          })

          if (updateTSConfig) {
            await addAliasesToTSConfig(tsConfigPath, aliases)
          }
        }
      }
    }
  }

  await fs.promises.writeFile(syncSettingsPath, JSON.stringify(config, null, 2))

  return {
    directory: config.directory!,
    importAlias: config.importAlias!,
    projectId: options.projectId,
  }
}
