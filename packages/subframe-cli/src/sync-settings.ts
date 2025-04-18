import { DEFAULT_SUBFRAME_TS_ALIAS, ROOT_FOLDER_NAME } from "@subframe/shared/constants"
import { existsSync, readFileSync } from "node:fs"
import { mkdir, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import prompts from "prompts"
import { addAliasesToTSConfig, hasAliasSetup } from "./add-tsconfig-alias"
import { ACCESS_TOKEN_FILENAME, SUBFRAME_DIR, SYNC_SETTINGS_FILENAME } from "./constants"
import { abortOnState } from "./sync-helpers"
import { exists, isDirectory, posixJoin } from "./utils/fs"

export interface SyncSettingsConfig {
  directory: string
  importAlias: string
  projectId?: string
}

export function getLocalSyncSettings(cwd: string): SyncSettingsConfig | null {
  try {
    const contents = readFileSync(join(cwd, SUBFRAME_DIR, SYNC_SETTINGS_FILENAME), "utf-8")
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
  initOptions: { dir?: string; alias?: string },
): Promise<SyncSettingsConfig> {
  const subframeDirPath = join(cwd, SUBFRAME_DIR)
  const syncSettingsPath = join(subframeDirPath, SYNC_SETTINGS_FILENAME)

  // Note: remove after 6/1/2025 - the access token is now stored in the data directory.
  // See config.ts for more details.
  //
  // We previously added a diff to .gitignore to avoid committing .subframe/access-token to git.
  // That is no longer needed, but no need to clean that up.
  const accessTokenPath = join(subframeDirPath, ACCESS_TOKEN_FILENAME)
  if (await exists(accessTokenPath)) {
    await rm(accessTokenPath)
  }

  const tsConfigPath = join(cwd, "tsconfig.json")
  const subframeDirExists = await isDirectory(subframeDirPath)

  if (!subframeDirExists) {
    await mkdir(subframeDirPath)
  }

  const config: Partial<SyncSettingsConfig> = {
    directory: options.directory,
    importAlias: options.importAlias,
    projectId: options.projectId,
  }

  if (!options.directory) {
    prompts.override({
      directory: initOptions.dir,
    })
    const response = await prompts({
      type: "text",
      name: "directory",
      initial: "./src",
      message: "Where should the Subframe components be synced to?",
      validate: (value) => {
        return existsSync(join(cwd, value)) ? true : `Directory ${value} does not exist`
      },
      onState: abortOnState,
    })

    // NOTE: join will remove the trailing slash
    config.directory = "./" + posixJoin(response.directory, ROOT_FOLDER_NAME)
  }

  if (!options.importAlias) {
    prompts.override({
      componentsDirAlias: initOptions.alias,
    })
    const response = await prompts({
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
        // NOTE: tsconfig.json requires relative paths (unless baseUrl is set), and posixJoin strips the ./
        [response.componentsDirAlias]: ["./" + posixJoin(config.directory, "/*")],
      }

      if (await exists(tsConfigPath)) {
        /** if we detect the aliases are not setup, ask to set them up */
        const isSetup = await hasAliasSetup(tsConfigPath, aliases)
        if (!isSetup) {
          await addAliasesToTSConfig(tsConfigPath, aliases)
        }
      }
    }
  }

  await writeFile(syncSettingsPath, JSON.stringify(config, null, 2))

  return {
    directory: config.directory!,
    importAlias: config.importAlias!,
    projectId: options.projectId,
  }
}
