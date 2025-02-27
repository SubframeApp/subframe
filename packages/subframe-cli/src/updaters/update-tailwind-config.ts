import { Project, ScriptKind, SyntaxKind, ObjectLiteralExpression, QuoteKind } from "ts-morph"
import { tmpdir } from "node:os"
import { mkdtemp } from "node:fs/promises"
import { join, basename, extname } from "node:path"

export async function _createSourceFile(input: string, configPath: string) {
  const dir = await mkdtemp(join(tmpdir(), "shadcn-"))
  const tempFile = join(dir, `shadcn-${basename(configPath)}`)

  const project = new Project({
    compilerOptions: {},
  })
  const scriptKind = extname(configPath).endsWith("ts") ? ScriptKind.TS : ScriptKind.JS

  const sourceFile = project.createSourceFile(tempFile, input, {
    scriptKind,
  })

  return { sourceFile, scriptKind }
}

export function _getQuoteChar(configObject: ObjectLiteralExpression) {
  return configObject.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getQuoteKind() === QuoteKind.Single
    ? "'"
    : '"'
}
