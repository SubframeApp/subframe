// Note: this needs to be prefixed because the id is a uuid and CSS class names can't start with a number
export function getScopedCSSClassName(id: string) {
  return `byoc-${id}`
}

export type BYOC_LIBRARY_NAME = `byoc-${string}`

export function getLibraryName(id: string): BYOC_LIBRARY_NAME {
  return `byoc-${id}`
}
