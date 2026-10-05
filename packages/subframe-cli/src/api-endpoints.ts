import retry, { FetchLibrary } from "fetch-retry"
import nodeFetch, { BodyInit } from "node-fetch"
import { ProxyAgent } from "proxy-agent"
import packageJson from "../package.json"
import type {
  CreateImportSessionRequest,
  CreateImportSessionResponse,
  InitProjectRequest,
  InitProjectResponse,
  ListProjectsResponse,
  PushComponentRequest,
  PushComponentResponse,
  StartImportRequest,
  StartImportResponse,
  SyncProjectRequest,
  SyncProjectResponse,
  UpdateImportAliasRequest,
  UpdateImportAliasResponse,
  VerifyTokenResponse,
} from "./api-types"
import { BASE_URL } from "./common"
import { CLI_UPGRADE_STATUS_CODE, CLI_VERSION_HEADER } from "./constants"
import { HttpResponseError } from "./errors"
import { flushLog, log } from "./log"
import { error } from "./output/format"

function prepareHttpBody<TBody, TBodyInit = BodyInit>(body: TBody, headers?: Record<string, string>) {
  if (headers?.["Content-Type"] === "application/json") {
    return JSON.stringify(body)
  }

  return body as unknown as TBodyInit
}

const MAX_RETRIES = 1
const STATUS_CODES_TO_NOT_RETRY = [501]
function makeFetchWithRetries<T extends FetchLibrary>(fetch: T) {
  return retry(fetch, {
    retries: MAX_RETRIES,
    retryDelay: (attempt) => Math.pow(2, attempt) * 1000,
    retryOn: (attempt, error, response) =>
      attempt < MAX_RETRIES &&
      Boolean(
        error !== null || (response && response.status >= 400 && !STATUS_CODES_TO_NOT_RETRY.includes(response.status)),
      ),
  })
}

// NOTE: ProxyAgent handles making HTTP requests through a corporate proxy
const agent = new ProxyAgent({ keepAlive: true })
const fetchWithRetries = makeFetchWithRetries<typeof nodeFetch>(nodeFetch)

/**
 * Sends an HTTP request with proxy support.
 * Automatically detects proxy from HTTP_PROXY, HTTPS_PROXY, NO_PROXY environment variables.
 */
const http = async <TBody, TResponse>(
  url: string,
  {
    method,
    body,
    headers = {
      "Content-Type": "application/json",
    },
  }: { method: "GET" | "POST"; body?: TBody; headers?: Record<string, string> },
): Promise<TResponse> => {
  const requestHeaders = { ...headers, [CLI_VERSION_HEADER]: packageJson.version }
  const response = await fetchWithRetries(url, {
    method,
    headers: requestHeaders,
    body: body ? prepareHttpBody<TBody, BodyInit>(body, requestHeaders) : undefined,
    agent,
  })

  if (response.ok) {
    return response.json()
  }

  const { message } = await response.json()

  if (response.status === CLI_UPGRADE_STATUS_CODE) {
    console.log()
    console.error(error(message))
    log.warn("CLI version rejected as outdated")
    await flushLog()
    process.exit(1)
  }

  throw new HttpResponseError(message, response.status)
}

export async function apiVerifyToken(token: string): Promise<VerifyTokenResponse> {
  const url = `${BASE_URL}/api/cli/verify`
  return http<void, VerifyTokenResponse>(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
}

export async function apiListProjects(token: string): Promise<ListProjectsResponse> {
  const url = `${BASE_URL}/api/cli/list-projects`
  return http<void, ListProjectsResponse>(url, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
}

export async function apiInitProject(token: string, { truncatedProjectId, cssType }: InitProjectRequest) {
  return http<InitProjectRequest, InitProjectResponse>(`${BASE_URL}/api/cli/init`, {
    method: "POST",
    body: { truncatedProjectId, cssType },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
}

export async function apiUpdateImportAlias(
  token: string,
  { truncatedProjectId, importAlias }: UpdateImportAliasRequest,
) {
  const response = await http<UpdateImportAliasRequest, UpdateImportAliasResponse>(`${BASE_URL}/api/cli/import-alias`, {
    method: "POST",
    body: { truncatedProjectId, importAlias },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
  return response.success
}

export async function apiSyncProject(
  token: string,
  { truncatedProjectId, components, importAlias, cssType }: SyncProjectRequest,
) {
  return http<SyncProjectRequest, SyncProjectResponse>(`${BASE_URL}/api/cli/sync`, {
    method: "POST",
    body: { truncatedProjectId, components, importAlias, cssType },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
}

export async function apiPushComponent(
  token: string,
  { truncatedProjectId, componentName, componentFile, skipNormalize }: PushComponentRequest,
) {
  return http<PushComponentRequest, PushComponentResponse>(`${BASE_URL}/api/cli/push-component`, {
    method: "POST",
    body: { truncatedProjectId, componentName, componentFile, skipNormalize },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
}

export async function apiCreateImportSession(token: string, { truncatedProjectId }: CreateImportSessionRequest) {
  return http<CreateImportSessionRequest, CreateImportSessionResponse>(`${BASE_URL}/api/cli/import/create-session`, {
    method: "POST",
    body: { truncatedProjectId },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
}

export async function apiStartImport(token: string, { truncatedProjectId, sessionId }: StartImportRequest) {
  return http<StartImportRequest, StartImportResponse>(`${BASE_URL}/api/cli/import/start`, {
    method: "POST",
    body: { truncatedProjectId, sessionId },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
}

export async function uploadToPresignedUrl(presignedUrl: string, payload: string): Promise<void> {
  const response = await nodeFetch(presignedUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: payload,
    agent,
  })

  if (!response.ok) {
    throw new Error(`Failed to upload to S3: ${response.status} ${response.statusText}`)
  }
}
