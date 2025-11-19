import { Distinct } from "shared/ts-type-helpers"

interface CodeGenFileUnknownMetadata {
  type: "unknown"
}

export interface CodeGenFileDefinitionMetadata {
  type: "definition"
  id: string
  isPageComponent: boolean
}

interface CodeGenFileIconMetadata {
  type: "icon"
  id: string
}

export type CodeGenFileMetadata = CodeGenFileUnknownMetadata | CodeGenFileDefinitionMetadata | CodeGenFileIconMetadata

export type CodeGenErrorType = "format"

export interface CodeGenError {
  type: CodeGenErrorType
  message: string
}

interface CodeGenFileBase {
  fileType: "css" | "tsx" | "ts" | "js"
  fileName: string
  metadata: CodeGenFileMetadata
}

export interface CodeGenFileError extends CodeGenFileBase {
  contents: null
  rawContents: string
  error: CodeGenError
}

export interface CodeGenFileValid extends CodeGenFileBase {
  contents: string
}

export type CodeGenFile = CodeGenFileError | CodeGenFileValid

export const CODE_GEN_CSS_TYPE_OPTIONS = ["tailwind", "tailwind-v4", "scss-with-modules"] as const
export type CodeGenCSSType = (typeof CODE_GEN_CSS_TYPE_OPTIONS)[number]

export const CODE_GEN_ICON_BEHAVIOR_OPTIONS = ["name", "component"] as const
export type CodeGenIconBehavior = (typeof CODE_GEN_ICON_BEHAVIOR_OPTIONS)[number]

// API
export interface VerifyTokenResponse {
  success: true
  userId: string
  teamId: number
}

export type TruncatedProjectId = Distinct<string, "TruncatedProjectId">

export interface InitProjectRequest {
  truncatedProjectId?: TruncatedProjectId
  cssType?: CodeGenCSSType
}

export interface InitProjectResponse {
  styleFile: CodeGenFileValid
  cssType: CodeGenCSSType
  oldImportAlias?: string
  projectInfo: {
    truncatedProjectId: TruncatedProjectId
    name: string
  }
}

export interface UpdateImportAliasRequest {
  truncatedProjectId?: TruncatedProjectId
  importAlias: string
}

export interface UpdateImportAliasResponse {
  success: true
}

export interface PushComponentRequest {
  componentName: string
  componentFile: string
}

export interface PushComponentResponse {
  success: true
  componentName: string
}

export interface SyncProjectRequest {
  truncatedProjectId?: TruncatedProjectId
  components: string[]
  importAlias: string
  cssType?: CodeGenCSSType
}

export interface SyncProjectResponse {
  definitionFiles: Array<{
    file: CodeGenFile
    folderName: string
  }>
  otherFiles: CodeGenFileValid[]
  missingComponents: string[]
  projectInfo: {
    truncatedProjectId: TruncatedProjectId
    name: string
  }
}

export interface ComponentFilesUploadRequest {
  id: string
  truncatedProjectId?: TruncatedProjectId
  files: Array<{
    contentType: "text/css" | "text/javascript"
    base64EncodedData: string
    name: string
  }>
}
