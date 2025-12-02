import { ANONYMOUS_CLI_USER_ID, ANONYMOUS_SERVER_USER_ID } from "./constants"

export function isAnonymousUserId(userId: string) {
  return userId === ANONYMOUS_SERVER_USER_ID || userId === ANONYMOUS_CLI_USER_ID
}
