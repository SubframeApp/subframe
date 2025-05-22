/**
 * Properties
 */
interface TextPropertyDefinition {
  type: "text"
  defaultValue?: string
}

interface NumberPropertyDefinition {
  type: "number"
  defaultValue?: number
}

interface ImagePropertyDefinition {
  type: "image"
  defaultValue?: string
}

interface BooleanPropertyDefinition {
  type: "boolean"
  defaultValue?: boolean
}

interface EnumPropertyDefinition<T extends readonly string[] = readonly string[]> {
  type: "enum"
  options: T
  defaultValue?: T[number]
}

interface SlotPropertyDefinition {
  type: "slot"
  // TODO: should there be a defaultValue?
}

interface IconPropertyDefinition {
  type: "icon"
  defaultValue?: string
}

export type PropertyDefinition =
  | TextPropertyDefinition
  | NumberPropertyDefinition
  | ImagePropertyDefinition
  | BooleanPropertyDefinition
  | EnumPropertyDefinition
  | SlotPropertyDefinition
  | IconPropertyDefinition

// Helper type to extract the corresponding value type from a PropertyDefinition
type PropertyValueType<T extends PropertyDefinition> = T extends TextPropertyDefinition
  ? string
  : T extends NumberPropertyDefinition
  ? number
  : T extends BooleanPropertyDefinition
  ? boolean
  : T extends EnumPropertyDefinition
  ? T["options"][number]
  : T extends SlotPropertyDefinition
  ? React.ReactNode
  : T extends IconPropertyDefinition
  ? string
  : never

// Transform the properties object type into the args type
type PropertiesArgs<T extends { [name: string]: PropertyDefinition }> = {
  [K in keyof T]: T[K] extends { defaultValue: any } ? PropertyValueType<T[K]> : PropertyValueType<T[K]> | undefined
}

/**
 * Import info
 */

// e.g. import Card from "@design-system/card"
interface ImportInfoDefault {
  type: "default"
  packageName: string
  property?: string // when true, then use dot notation to access the component, e.g. Card.Section
}

// e.g. import { Card } from "@design-system/card"
interface ImportInfoNamed {
  type: "named"
  packageName: string
  name: string
  property?: string // when true, then use dot notation to access the component, e.g. Card.Section
}
export type ImportInfo = ImportInfoDefault | ImportInfoNamed

/**
 * Metadata
 */
export type MetadataProperties = { [name: string]: PropertyDefinition }
export interface Metadata<P extends MetadataProperties = MetadataProperties> {
  title: string
  description?: string
  component: React.ComponentType<any>
  properties: P
  subcomponents?: Metadata[]
  importInfo: ImportInfo
  render: (args: PropertiesArgs<P>, ref?: React.Ref<HTMLElement>) => React.ReactNode
}
