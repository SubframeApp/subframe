/**
 * Packages included in this list will be automatically installed
 * when running the CLI (if they are not already installed)
 */
export const AUTOINSTALLED_DEPENDENCIES: Record<string, string> = { "@subframe/core": "latest" }

/**
 * The name of the directory that will be created in the root of the project
 * to store the sync settings and other subframe-related files that should
 * not be committed to git
 */
export const SUBFRAME_DIR = ".subframe"

/**
 * The name of the file that will be created in the subframe directory
 * to store the sync settings
 */
export const SYNC_SETTINGS_FILENAME = "sync.json"

/**
 * The name of the file to store the Subframe access token
 * TODO: remove after 6/1/2025
 */
export const ACCESS_TOKEN_FILENAME = "access-token"

/**
 * Shown to the user when the sync is complete
 */
export const SUBFRAME_SYNC_MESSAGE = "Subframe - all changes synced"
export const SUBFRAME_INIT_MESSAGE = "Subframe - initialized successfully"

export const MALFORMED_INIT_MESSAGE =
  "It looks like you need to first run the init command to setup your codebase for Subframe CLI.\nYou can do so by following the instructions here:\n\nhttps://app.subframe.com/library?component=installation"

export const MULTIPLE_PROJECTS_SUGGESTION =
  "We suggest using a separate package for each project. If you want to start fresh, you can run the CLI init again. You can find instructions here:\n\nhttps://app.subframe.com/library?component=installation"

export const WRONG_PROJECT_MESSAGE = `\nt seems you're trying to sync with a project that doesn't match the project in your current Subframe settings (sync.json)\n\n${MULTIPLE_PROJECTS_SUGGESTION}\n`

/**
 * Commnands
 *
 * We refactor it into this constants file because the main app references this when generating
 * copy/pasteable code snippets.
 */
export const COMMAND_AUTH_TOKEN_KEY = "--auth-token"
export const COMMAND_AUTH_TOKEN_KEY_SHORT = "-z"
export const COMMAND_TEMPLATE_KEY = "--template"
export const COMMAND_NAME_KEY = "--name"
export const COMMAND_NAME_KEY_SHORT = "-n"
export const COMMAND_DIR_KEY = "--dir"
export const COMMAND_DIR_KEY_SHORT = "-d"
export const COMMAND_PROJECT_ID_KEY = "--projectId"
export const COMMAND_PROJECT_ID_KEY_SHORT = "-p"
export const COMMAND_INSTALL_KEY = "--install"
export const COMMAND_INSTALL_KEY_SHORT = "-i"
export const COMMAND_TAILWIND_KEY = "--tailwind"
export const COMMAND_TAILWIND_KEY_SHORT = "-t"
export const COMMAND_ALIAS_KEY = "--alias"
export const COMMAND_ALIAS_KEY_SHORT = "-a"
