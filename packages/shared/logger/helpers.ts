import { ANONYMOUS_CLI_USER_ID, ANONYMOUS_DESKTOP_USER_ID, ANONYMOUS_SERVER_USER_ID } from "./constants"

export function isSharedAnonymousUserId(userId: string) {
  return userId === ANONYMOUS_SERVER_USER_ID || userId === ANONYMOUS_CLI_USER_ID || userId === ANONYMOUS_DESKTOP_USER_ID
}

export function makeAnonymousUserIdForTeam(teamId: number) {
  return `${ANONYMOUS_SERVER_USER_ID}-${teamId}`
}
