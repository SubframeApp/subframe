import nodeFetch, { BodyInit } from "node-fetch"
import { ProxyAgent } from "proxy-agent"
import { makeFetchWithRetries, prepareHttpBody } from "shared/http"
import type {
  InitProjectRequest,
  InitProjectResponse,
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
