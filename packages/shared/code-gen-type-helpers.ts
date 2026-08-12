import { ensureUnreachable } from "./ensure"
import { CodeGenFile, CodeGenFileValid } from "./types"

export function isCodeGenFileValid(file: CodeGenFile): file is CodeGenFileValid {
  return file.contents !== null
}

export function ensureIsValidCodeGenFile(file: CodeGenFile): CodeGenFileValid {
  if (!isCodeGenFileValid(file)) {
    throw new Error(`Code generation failed for ${file.fileName}: ${file.error.message}`)
  }
  return file
}

function isComponentFileType(fileType: CodeGenFile["fileType"]): boolean {
  switch (fileType) {
    case "tsx":
      return true
    case "ts":
    case "js":
    case "css":
    case "md":
      return false
    default:
      return ensureUnreachable(fileType)
  }
}

function isDocumentationFileType(fileType: CodeGenFile["fileType"]): boolean {
  switch (fileType) {
    case "md":
      return true
    case "tsx":
    case "ts":
    case "js":
    case "css":
      return false
    default:
      return ensureUnreachable(fileType)
  }
}

/**
 * Extracts the single component (.tsx) file from a codegen result and validates it.
 * Use when generating code for one component — the result may also contain auxiliary
 * files (.md, .css, per-component wrapper index.tsx) which this function filters out.
 */
export function ensureSingleValidCodeGenFile(files: CodeGenFile[]): CodeGenFileValid {
  const componentFiles = files.filter((f) => f.metadata.type === "definition" && isComponentFileType(f.fileType))
  if (componentFiles.length !== 1) {
    throw new Error(`Expected exactly one component file, got ${componentFiles.length}`)
  }
  return ensureIsValidCodeGenFile(componentFiles[0])
}

/**
 * Extracts the single documentation (.md) file from a codegen result if one exists.
 * Returns null if there is no documentation file.
 */
export function ensureSingleDocumentationCodeGenFileIfExists(files: CodeGenFile[]): CodeGenFileValid | null {
  const docFiles = files.filter((f) => isDocumentationFileType(f.fileType))
  if (docFiles.length === 0) {
    return null
  }
  if (docFiles.length !== 1) {
    throw new Error(`Expected at most one documentation file, got ${docFiles.length}`)
  }
  return ensureIsValidCodeGenFile(docFiles[0])
}
