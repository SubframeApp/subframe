import * as Sentry from "@sentry/node-core"
import { homedir } from "node:os"
import { FetchError } from "node-fetch"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { HttpResponseError } from "./errors"
import { NonInteractiveError } from "./interactive"
import { initLog, reportError } from "./log"

vi.mock("@sentry/node-core", () => ({
  init: vi.fn(),
  captureException: vi.fn(),
  flush: vi.fn(),
  logger: { warn: vi.fn() },
}))

describe("reportError", () => {
  it("leaves HTTP rejections to the server", () => {
    reportError(new HttpResponseError("Project not found", 404))

    expect(Sentry.captureException).not.toHaveBeenCalled()
    expect(Sentry.logger.warn).not.toHaveBeenCalled()
  })

  it("treats NonInteractiveError as a user condition", () => {
    reportError(new NonInteractiveError("Pass --project-id"))

    expect(Sentry.captureException).not.toHaveBeenCalled()
    expect(Sentry.logger.warn).not.toHaveBeenCalled()
  })

  it("warns with the code when a request got no response", () => {
    reportError(Object.assign(new Error("connect ECONNREFUSED 127.0.0.1:443"), { code: "ECONNREFUSED" }))

    expect(Sentry.logger.warn).toHaveBeenCalledWith("Request failed without a response", { code: "ECONNREFUSED" })
    expect(Sentry.captureException).not.toHaveBeenCalled()
  })

  it("warns for node-fetch failures such as proxy errors", () => {
    reportError(
      new FetchError("request to https://app.subframe.com failed", "system", {
        name: "Error",
        message: "socket hang up",
        code: "ECONNRESET",
      }),
    )

    expect(Sentry.logger.warn).toHaveBeenCalledWith("Request failed without a response", { code: "ECONNRESET" })
  })

  it("captures local failures that carry a system code", () => {
    const error = Object.assign(new Error("EACCES: permission denied"), { code: "EACCES" })

    reportError(error)

    expect(Sentry.captureException).toHaveBeenCalledWith(error, { extra: undefined })
    expect(Sentry.logger.warn).not.toHaveBeenCalled()
  })

  it("coerces thrown non-errors", () => {
    reportError("boom")

    const [captured] = vi.mocked(Sentry.captureException).mock.calls[0]
    expect(captured).toBeInstanceOf(Error)
    expect((captured as Error).message).toBe("boom")
  })
})

describe("path scrubbing", () => {
  beforeEach(() => {
    initLog()
  })

  function getOptions() {
    const options = vi.mocked(Sentry.init).mock.calls[0][0]
    if (!options?.beforeSend || !options.beforeSendLog) {
      throw new Error("initLog must register scrubbing hooks")
    }
    return { beforeSend: options.beforeSend, beforeSendLog: options.beforeSendLog }
  }

  it("replaces cwd and home in exception messages, stack frames and extras", () => {
    const { beforeSend } = getOptions()

    const event = beforeSend(
      {
        type: undefined,
        server_name: "adams-macbook",
        extra: { file: `${process.cwd()}/src/a.ts` },
        exception: {
          values: [
            {
              value: `ENOENT: open '${homedir()}/.config/auth.json' from ${process.cwd()}`,
              stacktrace: {
                frames: [{ filename: `${process.cwd()}/dist/index.js`, abs_path: `${homedir()}/x/dist/index.js` }],
              },
            },
          ],
        },
      },
      {},
    )

    const exception = (event as { exception: any }).exception.values[0]
    expect(exception.value).toBe("ENOENT: open '~/.config/auth.json' from <cwd>")
    expect(exception.stacktrace.frames[0]).toEqual({ filename: "<cwd>/dist/index.js", abs_path: "~/x/dist/index.js" })
    expect((event as { extra: unknown }).extra).toEqual({ file: "<cwd>/src/a.ts" })
    expect(event).not.toHaveProperty("server_name")
  })

  it("replaces cwd and home in log messages and attributes", () => {
    const { beforeSendLog } = getOptions()

    const log = beforeSendLog({
      level: "warn",
      message: `Failed in ${process.cwd()}`,
      attributes: { path: `${homedir()}/proj`, count: 2 },
    })

    expect(log).toMatchObject({ message: "Failed in <cwd>", attributes: { path: "~/proj", count: 2 } })
  })
})
