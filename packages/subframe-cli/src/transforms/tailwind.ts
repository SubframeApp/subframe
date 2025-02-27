import { join, relative } from "node:path"
import { ts } from "ts-morph"

type PresetsProperty = ts.PropertyAssignment & {
  name: (ts.Identifier | ts.StringLiteral) & { text: "presets" }
  initializer: ts.ArrayLiteralExpression
}

export function isPresetsProperty(property: ts.ObjectLiteralElementLike): property is PresetsProperty {
  if (
    ts.isPropertyAssignment(property) &&
    (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
    ts.isArrayLiteralExpression(property.initializer)
  ) {
    return property.name.text === "presets"
  }

  return false
}

type ContentProperty = ts.PropertyAssignment & {
  name: (ts.Identifier | ts.StringLiteral) & { text: "content" }
  initializer: ts.ArrayLiteralExpression
}

export function isContentProperty(property: ts.ObjectLiteralElementLike): property is ContentProperty {
  if (
    ts.isPropertyAssignment(property) &&
    (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
    ts.isArrayLiteralExpression(property.initializer)
  ) {
    return property.name.text === "content"
  }

  return false
}

export function makeSubframeContentGlob(cwd: string, subframeDirPath: string) {
  return "./" + join(relative(cwd, subframeDirPath), "**", "*.{tsx,ts,js,jsx}")
}

export function hasSubframeContentGlob(globs: ts.ArrayLiteralExpression, cwd: string, subframeDirPath: string) {
  const subframeContentGlob = makeSubframeContentGlob(cwd, subframeDirPath)

  return globs.elements.some((element) => {
    if (ts.isStringLiteral(element)) {
      return element.text === subframeContentGlob
    }

    return false
  })
}

function getSuframeTailwindPresetPath(cwd: string, subframeDirPath: string): string {
  return "./" + join(relative(cwd, subframeDirPath), "tailwind.config.js")
}

export function makeSubframeRequire(cwd: string, subframeDirPath: string) {
  const relativeImportPath = "./" + join(relative(cwd, subframeDirPath), "tailwind.config.js")

  return ts.factory.createCallExpression(
    ts.factory.createIdentifier("require"),
    [],
    [ts.factory.createStringLiteral(relativeImportPath)],
  )
}

/**
 * Checks if the given presets array contains a call expression that
 * requires the subframe's tailwind.config.js file.
 */
export function hasSubframeRequire(presets: ts.ArrayLiteralExpression, cwd: string, subframeDirPath: string) {
  const subframeRequirePath = getSuframeTailwindPresetPath(cwd, subframeDirPath)

  return presets.elements.some((element) => {
    if (
      ts.isCallExpression(element) &&
      ts.isIdentifier(element.expression) &&
      ts.isStringLiteral(element.arguments[0])
    ) {
      return element.expression.text === "require" && element.arguments[0].text === subframeRequirePath
    }

    return false
  })
}
