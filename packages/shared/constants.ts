export const IGNORE_UPDATE_KEYWORD = "@subframe/sync-disable"

// import aliases
export const DEFAULT_SUBFRAME_TS_ALIAS = "@/ui"

// the folder where everything is nested under
export const ROOT_FOLDER_NAME = "ui"

export const FAILED_TO_FETCH_PROJECT_ERROR = "Unable to fetch project"

export const TAILWIND_CONFIG_EXPORT_FILENAME = "tailwind.config.js"
export const TAILWIND_CSS_EXPORT_FILENAME = "theme.css"
export const COMPONENT_WRAPPER_FILENAME = "index.tsx"

// Docs URLs
export const DOCS_COMPONENT_DIRECTORIES_URL = "https://docs.subframe.com/upgrading/component-directories"
export const DOCS_WRAPPER_COMPONENTS_URL = "https://docs.subframe.com/concepts/syncing-components#wrapping-components"

/**
 * CLI-specific constants
 */

export const CLI_VERSION_HEADER = "x-subframe-cli-version"

export const CLI_UPGRADE_STATUS_CODE = 426

/**
 * Commands
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
