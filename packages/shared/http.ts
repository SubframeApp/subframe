import retry from "fetch-retry"

function prepareHttpBody<TBody>(body: TBody, headers?: Record<string, string>) {
  if (headers?.["Content-Type"] === "application/json") {
    return JSON.stringify(body)
  }

  return body as BodyInit
}

const MAX_RETRIES = 1
const fetchWithRetries = retry(fetch, {
  retries: MAX_RETRIES,
  retryDelay: (attempt) => {
    return Math.pow(2, attempt) * 1000
  },
  retryOn: function (attempt, error, response) {
    // retry on any network error, or 4xx or 5xx status codes
    return attempt < MAX_RETRIES && Boolean(error !== null || (response && response.status >= 400))
  },
})

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

export async function* httpStreamText<TBody>(verb: "POST", url: string, body: TBody): AsyncIterableIterator<string> {
  const response = await fetchWithRetries(url, {
    method: verb,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }

  const reader = response.body!.getReader()
  const decoder = new TextDecoder("utf-8")

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      yield decoder.decode(value, { stream: true })
    }
  } finally {
    reader.releaseLock()
  }
}
