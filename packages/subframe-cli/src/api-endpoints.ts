import { http } from "shared/http"
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
