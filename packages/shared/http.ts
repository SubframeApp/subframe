import retry, { FetchLibrary } from "fetch-retry"

export function prepareHttpBody<TBody, TBodyInit = BodyInit>(body: TBody, headers?: Record<string, string>) {
  if (headers?.["Content-Type"] === "application/json") {
    return JSON.stringify(body)
  }

  return body as unknown as TBodyInit
}

const MAX_RETRIES = 1
export function makeFetchWithRetries<T extends FetchLibrary>(fetch: T) {
  return retry(fetch, {
    retries: MAX_RETRIES,
    retryDelay: (attempt) => Math.pow(2, attempt) * 1000,
    retryOn: (attempt, error, response) =>
      attempt < MAX_RETRIES && Boolean(error !== null || (response && response.status >= 400)),
  })
}
const fetchWithRetries = makeFetchWithRetries<typeof fetch>(fetch)

/**
 * Sends an HTTP request.
 */
export const http = async <TBody, TResponse>(
  url: string,
  {
    method,
    body,
    headers = {
      "Content-Type": "application/json",
    },
  }: { method: "GET" | "POST"; body?: TBody; headers?: Record<string, string> },
): Promise<TResponse> => {
  const response = await fetchWithRetries(url, {
    method,
    headers,
    body: body ? prepareHttpBody(body, headers) : undefined,
  })

  if (response.ok) {
    return response.json()
  } else {
    const { message } = await response.json()
    throw new Error(message)
  }
}
