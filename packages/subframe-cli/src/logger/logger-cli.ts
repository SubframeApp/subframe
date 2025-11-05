import { makeNodeLogger } from "shared/logger/logger-node"
import type { TypedLogger } from "shared/logger/types"
import type { WithRequired } from "shared/type-helpers"

// Note: This is not a secret and fine being hardcoded in the source code.
const ANONYMOUS_CLI_USER_ID = "ANONYMOUS_CLI_USER-db6a3ec1-756a-4931-acdd-ec29f531603c" as const

type CLITrackEventType = {
  type: "cli:starter-kit_cloned"
  framework: "nextjs" | "vite" | "astro"
  cssType: "tailwind" | "tailwind-v4"
}

export type CLILogger = WithRequired<
  TypedLogger<CLITrackEventType>,
  "trackEventAndFlush" | "trackWarningAndFlush" | "logExceptionAndFlush"
>

export function makeCLILogger(): CLILogger {
  return makeNodeLogger<CLITrackEventType>({ userId: ANONYMOUS_CLI_USER_ID, teamId: null })
}
