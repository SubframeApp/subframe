import nodeFetch, { FetchError, Response } from "node-fetch"
import { describe, expect, it, vi } from "vitest"
import { apiListProjects } from "./api-endpoints"
import { HttpResponseError, UserError } from "./errors"
import { log } from "./log"

vi.mock("node-fetch", async (importOriginal) => ({
  ...(await importOriginal<typeof import("node-fetch")>()),
  default: vi.fn(),
}))
vi.mock("./log", () => ({ log: { warn: vi.fn(), error: vi.fn() } }))

describe("request failures", () => {
  it("turns a request that got no response into a UserError and warns with the code", async () => {
    vi.useFakeTimers()
    vi.mocked(nodeFetch).mockRejectedValue(
      new FetchError("request to https://x failed, reason: getaddrinfo ENOTFOUND x", "system", {
        name: "Error",
        message: "getaddrinfo ENOTFOUND x",
        code: "ENOTFOUND",
      }),
    )

    const result = apiListProjects("token").catch((err) => err)
    await vi.runAllTimersAsync()
    vi.useRealTimers()
    const err = await result

    expect(err).toBeInstanceOf(UserError)
    expect(err.message).toBe("request to https://x failed, reason: getaddrinfo ENOTFOUND x")
    expect(log.warn).toHaveBeenCalledWith("Request failed without a response", { code: "ENOTFOUND" })
  })

  it("falls back to the status when an error response is not JSON", async () => {
    vi.mocked(nodeFetch).mockResolvedValue(new Response("<html>Bad gateway</html>", { status: 501 }))

    const err = await apiListProjects("token").catch((e) => e)

    expect(err).toBeInstanceOf(HttpResponseError)
    expect(err).toMatchObject({ message: "Request failed with status 501", status: 501 })
  })

  it("leaves a successful response with an invalid body as a reportable error", async () => {
    vi.mocked(nodeFetch).mockResolvedValue(new Response("not json", { status: 200 }))

    const err = await apiListProjects("token").catch((e) => e)

    expect(err).toBeInstanceOf(Error)
    expect(err).not.toBeInstanceOf(UserError)
  })
})
