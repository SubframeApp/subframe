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

export async function apiVerifyToken(token: string) {
  const search = new URLSearchParams()
  search.set("token", token)
  const url = `${BASE_URL}/api/cli/verify?${search.toString()}`
  const response = await http<void, VerifyTokenResponse>(url, { method: "GET" })
  return response.success
}

export async function apiInitProject({ token, truncatedProjectId, cssType }: InitProjectRequest) {
  return http<InitProjectRequest, InitProjectResponse>(`${BASE_URL}/api/cli/init`, {
    method: "POST",
    body: { token, truncatedProjectId, cssType },
  })
}

export async function apiUpdateImportAlias({ token, truncatedProjectId, importAlias }: UpdateImportAliasRequest) {
  const response = await http<UpdateImportAliasRequest, UpdateImportAliasResponse>(`${BASE_URL}/api/cli/import-alias`, {
    method: "POST",
    body: { token, truncatedProjectId, importAlias },
  })
  return response.success
}

export async function apiSyncProject({
  token,
  truncatedProjectId,
  components,
  importAlias,
  cssType,
}: SyncProjectRequest) {
  return http<SyncProjectRequest, SyncProjectResponse>(`${BASE_URL}/api/cli/sync`, {
    method: "POST",
    body: { token, truncatedProjectId, components, importAlias, cssType },
  })
}
