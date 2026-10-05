import { Analytics } from "@segment/analytics-node"
import * as Sentry from "@sentry/node-core"
import { isTelemetryAllowed } from "./common"

// hardcoded by Posthog: https://posthog.com/docs/libraries/segment#using-group-analytics
const SEGMENT_GROUP_KEY = "segment_group"

// Not a secret; shared by every CLI install until a token is verified.
const ANONYMOUS_CLI_USER_ID = "ANONYMOUS_CLI_USER-db6a3ec1-756a-4931-acdd-ec29f531603c"

type CLITrackEvent = {
  type: "cli:starter-kit_cloned"
  framework: "nextjs" | "vite" | "astro"
  cssType: "tailwind" | "tailwind-v4"
}

let client: Analytics | null = null
let currentUserId = ANONYMOUS_CLI_USER_ID
let currentTeamId: string | null = null

function getClient(): Analytics | null {
  if (!process.env.SEGMENT_WRITE_KEY || !isTelemetryAllowed) {
    return null
  }
  client ??= new Analytics({ writeKey: process.env.SEGMENT_WRITE_KEY, flushAt: 1 }).on("error", console.error)
  return client
}

function identify({ userId, teamId }: { userId: string; teamId: number }) {
  currentUserId = userId
  currentTeamId = String(teamId)
  Sentry.setUser({ id: userId })
  Sentry.setTag("teamId", currentTeamId)

  const segment = getClient()
  if (!segment) {
    return
  }
  segment.identify({ userId })
  segment.group({ userId, groupId: currentTeamId })
}

function trackEvent({ type, ...properties }: CLITrackEvent) {
  const segment = getClient()
  if (!segment) {
    return
  }
  segment.track({
    userId: currentUserId,
    event: type,
    // Posthog requires specifying the group on all Segment events: https://posthog.com/docs/libraries/segment
    properties: { ...properties, ...(currentTeamId !== null && { $groups: { [SEGMENT_GROUP_KEY]: currentTeamId } }) },
  })
}

async function flush() {
  // segment batches events (10s delay), so they must be flushed before exiting
  await client?.flush()
}

export const analytics = { identify, trackEvent, flush }
