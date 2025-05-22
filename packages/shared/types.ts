export interface CodeGenFile {
  fileType: "css" | "tsx" | "ts" | "js"
  fileName: string
  contents: string
  metadata: {
    // the definition this file is associated with, if any
    definitionInfo?: {
      id: string
      isPageComponent: boolean
    }
  }
}

export const CODE_GEN_CSS_TYPE_OPTIONS = ["tailwind", "tailwind-v4", "scss-with-modules"] as const
export type CodeGenCSSType = (typeof CODE_GEN_CSS_TYPE_OPTIONS)[number]

export const CODE_GEN_ICON_BEHAVIOR_OPTIONS = ["name", "component"] as const
export type CodeGenIconBehavior = (typeof CODE_GEN_ICON_BEHAVIOR_OPTIONS)[number]

// API
export interface VerifyTokenResponse {
  success: true
}

export interface InitProjectRequest {
  token: string
  truncatedProjectId?: string
  cssType?: CodeGenCSSType
}

export interface InitProjectResponse {
  styleFile: CodeGenFile
  cssType: CodeGenCSSType
  oldImportAlias?: string
}

export interface UpdateImportAliasRequest {
  token: string
  truncatedProjectId?: string
  importAlias: string
}

export interface UpdateImportAliasResponse {
  success: true
}

export interface SyncProjectRequest {
  token: string
  truncatedProjectId?: string
  components: string[]
  importAlias: string
  cssType?: CodeGenCSSType
}

export interface SyncProjectResponse {
  definitionFiles: Array<{
    file: CodeGenFile
    folderName: string
  }>
  otherFiles: CodeGenFile[]
  errorComponents: string[]
}

export interface ComponentFilesUploadRequest {
  token: string
  id: string
  truncatedProjectId?: string
  files: Array<{
    contentType: "text/css" | "text/javascript"
    base64EncodedData: string
    name: string
  }>
}

export interface ComponentFilesUploadResponse {
  message: string
}
