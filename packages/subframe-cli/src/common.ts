import { getLocalSyncSettings } from "./sync-settings"

// Whether or not to use the local dev server
// this is only used for internal debugging purposes
// and should not be used by end-users
export const isDev = process.argv.includes("--dev")

// Whether or not to target the beta (staging) environment at beta.subframe.com
// --dev takes precedence if both flags are passed. This is intended for
// internal testing against staging and should not be used by end-users.
export const isBeta = !isDev && process.argv.includes("--beta")

// The base URL of the Subframe backend for the selected environment.
// This is the single source of truth used by all API calls.
export const BASE_URL = isDev
  ? "http://localhost:6501"
  : isBeta
    ? "https://beta.subframe.com"
    : "https://app.subframe.com"

export const cwd = process.cwd()

export const localSyncSettings = getLocalSyncSettings(cwd)
