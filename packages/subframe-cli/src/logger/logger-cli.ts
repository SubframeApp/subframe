import { makeNodeLogger, TypedLogger, WithRequired } from "@subframe/shared"
import "dotenv/config"

const ANONYMOUS_CLI_USER_ID = "ANONYMOUS_CLI_USER-db6a3ec1-756a-4931-acdd-ec29f531603c"

type CLITrackEventType = { type: "cli:starter-kit_cloned"; framework: "nextjs" | "vite" }

export type CLILogger = WithRequired<
  TypedLogger<CLITrackEventType>,
  "trackEventAndFlush" | "trackWarningAndFlush" | "logExceptionAndFlush"
>

export function makeCLILogger(): CLILogger {
  return makeNodeLogger<CLITrackEventType>(ANONYMOUS_CLI_USER_ID)
}
