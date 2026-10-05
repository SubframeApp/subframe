import * as Sentry from "@sentry/node-core"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const segment = vi.hoisted(() => ({ constructed: 0, track: vi.fn(), identify: vi.fn(), group: vi.fn() }))

vi.mock("@segment/analytics-node", () => ({
  Analytics: class {
    constructor() {
      segment.constructed++
    }
    on() {
      return this
    }
    track = segment.track
    identify = segment.identify
    group = segment.group
    flush = vi.fn()
  },
}))

vi.mock("@sentry/node-core", () => ({
  init: vi.fn(),
  setUser: vi.fn(),
  setTag: vi.fn(),
  flush: vi.fn(),
  captureException: vi.fn(),
  logger: { warn: vi.fn() },
}))

// DO_NOT_TRACK is read when ./common loads, so each case needs a fresh module graph.
async function loadTelemetry() {
  vi.resetModules()
  const { initLog } = await import("./log")
  const { analytics } = await import("./analytics")
  initLog()
  analytics.identify({ userId: "user-1", teamId: 7 })
  analytics.trackEvent({ type: "cli:starter-kit_cloned", framework: "vite", cssType: "tailwind" })
}

describe("DO_NOT_TRACK", () => {
  beforeEach(() => {
    segment.constructed = 0
    vi.stubEnv("SEGMENT_WRITE_KEY", "write-key")
    vi.stubEnv("SENTRY_DSN", "http://public@127.0.0.1:1/1")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("disables both Segment and Sentry", async () => {
    vi.stubEnv("DO_NOT_TRACK", "1")

    await loadTelemetry()

    expect(segment.constructed).toBe(0)
    expect(segment.track).not.toHaveBeenCalled()
    expect(vi.mocked(Sentry.init).mock.calls[0][0]).toMatchObject({ enabled: false })
  })

  it("stays on when DO_NOT_TRACK is 0", async () => {
    vi.stubEnv("DO_NOT_TRACK", "0")

    await loadTelemetry()

    expect(segment.track).toHaveBeenCalledWith({
      userId: "user-1",
      event: "cli:starter-kit_cloned",
      properties: { framework: "vite", cssType: "tailwind", $groups: { segment_group: "7" } },
    })
    expect(vi.mocked(Sentry.init).mock.calls[0][0]).toMatchObject({ enabled: true })
  })
})
