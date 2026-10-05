/**
 * Environment variable used to supply an access token non-interactively.
 * Preferred over the --auth-token flag for CI/agents since it doesn't leak the
 * token into the process list or shell history.
 */
export const SUBFRAME_AUTH_TOKEN_ENV = "SUBFRAME_AUTH_TOKEN"

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
  "It looks like you need to first run the init command to setup your codebase for Subframe CLI.\nYou can do so by following the instructions here:\n\nhttps://docs.subframe.com/develop/installation"

export const MULTIPLE_PROJECTS_SUGGESTION =
  "We suggest using a separate package for each project. If you want to start fresh, you can run the CLI init again. You can find instructions here:\n\nhttps://docs.subframe.com/develop/installation"

export const WRONG_PROJECT_MESSAGE = `\nIt seems you're trying to sync a project that doesn't match the project in your current Subframe settings (sync.json)\n\n${MULTIPLE_PROJECTS_SUGGESTION}\n`

export const IGNORE_UPDATE_KEYWORD = "@subframe/sync-disable"

// import aliases
export const DEFAULT_SUBFRAME_TS_ALIAS = "@/ui"

// the folder where everything is nested under
export const ROOT_FOLDER_NAME = "ui"

export const FAILED_TO_FETCH_PROJECT_ERROR = "Unable to fetch project"

export const TAILWIND_CSS_EXPORT_FILENAME = "theme.css"
export const COMPONENT_WRAPPER_FILENAME = "index.tsx"

// Docs URLs
export const DOCS_COMPONENT_DIRECTORIES_URL = "https://docs.subframe.com/develop/upgrading/component-directories"

/**
 * CLI-specific constants
 */

export const CLI_VERSION_HEADER = "x-subframe-cli-version"

export const CLI_UPGRADE_STATUS_CODE = 426

/**
 * Commands
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
export const COMMAND_SYNC_KEY = "--sync"
export const COMMAND_SYNC_KEY_SHORT = "-s"
export const COMMAND_ALL_KEY = "--all"
export const COMMAND_ALL_KEY_SHORT = "-a"
export const COMMAND_CSS_TYPE_KEY = "--css-type"
export const COMMAND_CSS_TYPE_KEY_SHORT = "-c"
export const COMMAND_CSS_PATH_KEY = "--css-path"
export const COMMAND_CSS_PATH_KEY_SHORT = "-x"

// Negated forms of the boolean step flags, so a step can be forced off without a prompt.
export const COMMAND_NO_INSTALL_KEY = "--no-install"
export const COMMAND_NO_SYNC_KEY = "--no-sync"
export const COMMAND_NO_TAILWIND_KEY = "--no-tailwind"
export const COMMAND_UPDATE_IMPORT_ALIAS_KEY = "--update-import-alias"
export const COMMAND_NO_UPDATE_IMPORT_ALIAS_KEY = "--no-update-import-alias"

// Global, cross-command flags. These are read directly from argv (see the CLI's
// flags.ts) in addition to being registered with commander, so both spots must
// reference the same constant.
export const COMMAND_YES_KEY = "--yes"
export const COMMAND_YES_KEY_SHORT = "-y"
export const COMMAND_NON_INTERACTIVE_KEY = "--non-interactive"
export const COMMAND_JSON_KEY = "--json"

export const CLI_AUTH_ROUTE = "/cli/auth"
