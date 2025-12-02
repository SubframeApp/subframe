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
