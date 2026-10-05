// Taken from https://stackoverflow.com/questions/56737033/how-to-define-an-opaque-type-in-typescript
type Distinct<T, DistinctName> = T & { readonly __TYPE__: DistinctName }

interface CodeGenFileRootAssetMetadata {
  type: "root-asset"
}

interface CodeGenFileDefinitionMetadata {
  type: "definition"
  id: string
  isPageComponent: boolean
}

interface CodeGenFileDefinitionWrapperMetadata {
  type: "definition-wrapper"
  parentComponentId: string
}

interface CodeGenFileIconMetadata {
  type: "icon"
  id: string
}

interface CodeGenFileDocumentMetadata {
  type: "document"
  id: string
  parentComponentId: string
}

type CodeGenFileMetadata =
  | CodeGenFileRootAssetMetadata
  | CodeGenFileDefinitionMetadata
  | CodeGenFileDefinitionWrapperMetadata
  | CodeGenFileIconMetadata
  | CodeGenFileDocumentMetadata

type CodeGenErrorType = "format"

interface CodeGenError {
  type: CodeGenErrorType
  message: string
}

interface CodeGenFileBase {
  fileType: "css" | "tsx" | "ts" | "js" | "md"
  fileName: string
  // Directory the file should live in, relative to the project root. Empty string means the
  // project root itself.
  directory: string
  metadata: CodeGenFileMetadata
}

interface CodeGenFileError extends CodeGenFileBase {
  contents: null
  rawContents: string
  error: CodeGenError
}

export interface CodeGenFileValid extends CodeGenFileBase {
  contents: string
}

export type CodeGenFile = CodeGenFileError | CodeGenFileValid

type CodeGenCSSType = "tailwind" | "tailwind-v4" | "scss-with-modules"

// API
export interface VerifyTokenResponse {
  success: true
  userId: string
  teamId: number
}

export type TruncatedProjectId = Distinct<string, "TruncatedProjectId">

export interface ListProjectsResponse {
  projects: Array<{
    truncatedProjectId: TruncatedProjectId
    name: string
  }>
}

export interface InitProjectRequest {
  truncatedProjectId?: TruncatedProjectId
  cssType?: CodeGenCSSType
}

export interface InitProjectResponse {
  styleFile: CodeGenFileValid
  // Present for v3 + hasDarkMode. The CLI must write this file under
  // <importAlias>/theme.css and inject `@import "<rel-path>/theme.css";`
  // into the user's global stylesheet — same flow as the v4 styleFile.
  themeCssFile?: CodeGenFileValid
  cssType: CodeGenCSSType
  oldImportAlias?: string
  projectInfo: {
    teamId: number
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
  truncatedProjectId: TruncatedProjectId
  componentFile: string
  componentName: string
  skipNormalize?: boolean
  isNewComponent?: boolean
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
    teamId: number
    truncatedProjectId: TruncatedProjectId
    name: string
  }
}

export interface DesignSystemImportPayloadSource {
  path: string
  content: string
}

export interface DesignSystemImportPayload {
  theme: DesignSystemImportPayloadSource[]
  components: Array<{
    name: string
    entrypoint: string
    sourceFiles: DesignSystemImportPayloadSource[]
    supportingFiles: DesignSystemImportPayloadSource[]
  }>
}

export interface CreateImportSessionRequest {
  truncatedProjectId: TruncatedProjectId
}

export interface CreateImportSessionResponse {
  sessionId: string
  presignedUrl: string
}

export interface StartImportRequest {
  truncatedProjectId: TruncatedProjectId
  sessionId: string
}

export interface StartImportResponse {
  success: true
  importId: string
}
