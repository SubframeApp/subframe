import nodeFetch, { BodyInit } from "node-fetch"
import { ProxyAgent } from "proxy-agent"
import { makeFetchWithRetries, prepareHttpBody } from "shared/http"
import type {
  CreateImportSessionRequest,
  CreateImportSessionResponse,
  InitProjectRequest,
  InitProjectResponse,
  ListProjectsResponse,
  ListThemesRequest,
  ListThemesResponse,
  PushComponentRequest,
  PushComponentResponse,
  StartImportRequest,
  StartImportResponse,
  SyncProjectRequest,
  SyncProjectResponse,
  UpdateImportAliasRequest,
  UpdateImportAliasResponse,
  VerifyTokenResponse,
} from "shared/types"
import { isDev } from "./common"

const BASE_URL = isDev ? "http://localhost:6501" : "https://app.subframe.com"

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
  const response = await fetchWithRetries(url, {
    method,
    headers,
    body: body ? prepareHttpBody<TBody, BodyInit>(body, headers) : undefined,
    agent,
  })

  if (response.ok) {
    return response.json()
  } else {
    const { message } = await response.json()
    throw new Error(message)
  }
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

export async function apiInitProject(
  token: string,
  { truncatedProjectId, cssType, themeId }: InitProjectRequest,
) {
  return http<InitProjectRequest, InitProjectResponse>(`${BASE_URL}/api/cli/init`, {
    method: "POST",
    body: { truncatedProjectId, cssType, themeId },
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  })
}

export async function apiListThemes(
  token: string,
  { truncatedProjectId }: ListThemesRequest,
): Promise<ListThemesResponse> {
  return http<ListThemesRequest, ListThemesResponse>(`${BASE_URL}/api/cli/list-themes`, {
    method: "POST",
    body: { truncatedProjectId },
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
  { truncatedProjectId, components, importAlias, cssType, themeId }: SyncProjectRequest,
) {
  return http<SyncProjectRequest, SyncProjectResponse>(`${BASE_URL}/api/cli/sync`, {
    method: "POST",
    body: { truncatedProjectId, components, importAlias, cssType, themeId },
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
