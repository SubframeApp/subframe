/**
 * Properties
 */
export interface TextPropertyDefinition {
  type: "text"
  defaultValue?: string
}

export interface NumberPropertyDefinition {
  type: "number"
  defaultValue?: number
}

export interface ImagePropertyDefinition {
  type: "image"
  defaultValue?: string
}

export interface BooleanPropertyDefinition {
  type: "boolean"
  defaultValue?: boolean
}

export interface EnumPropertyDefinition<T extends readonly string[] = readonly string[]> {
  type: "enum"
  options: T
  defaultValue?: T[number]
}

export interface SlotPropertyDefinition<P extends MetadataProperties = any, Q = PropertiesArgs<P>> {
  type: "slot"
  defaultValue?: Array<{
    component: Metadata<P>
    args: Partial<Q>
  }>
}

export interface IconPropertyDefinition {
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
type PropertiesArgs<T extends MetadataProperties> = {
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

interface IconMetadata {
  importInfo: ImportInfo
  render: (args: object, ref?: React.Ref<SVGSVGElement>) => React.ReactNode
}

export interface IconLibrary {
  [name: string]: IconMetadata
}

/**
 * Metadata
 */
export type MetadataProperties = { [name: string]: PropertyDefinition }
export interface Metadata<
  P extends MetadataProperties = MetadataProperties,
  Q extends MetadataProperties[] = MetadataProperties[],
> {
  title: string
  description?: string
  component: React.ComponentType<any>
  properties: P
  subcomponents?: { [K in keyof Q]: Metadata<Q[K]> }
  importInfo: ImportInfo
  render: (args: PropertiesArgs<P>, ref?: React.Ref<HTMLElement>) => React.ReactNode
}

export interface ComponentLibrary {
  [name: string]: Metadata
}
