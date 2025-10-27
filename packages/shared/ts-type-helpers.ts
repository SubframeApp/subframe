// NOTE: taken from https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
// Makes given keys no longer required
export type OptionalProps<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type ValueOf<T> = T[keyof T]

// Taken from https://stackoverflow.com/questions/51691235/typescript-map-union-type-to-another-union-type
export type MapToTypeTuple<T extends Record<K, string>, K extends keyof T> = T extends any
  ? { type: T[K]; value: T }
  : never

// Taken from https://stackoverflow.com/questions/56737033/how-to-define-an-opaque-type-in-typescript
export type Distinct<T, DistinctName> = T & { readonly __TYPE__: DistinctName }

// Taken from https://stackoverflow.com/questions/60131681/make-sure-array-has-all-types-from-a-union
// Ensures that array has all types from union.
// Is this failing for you? Check that you either
//   (a) you aren't missing any values from the array
//   (b) you don't have any invalid values in the array
export const makeArrayOfAll =
  <T>() =>
  <U extends T[]>(array: U & ([T] extends [U[number]] ? unknown : "__invalid-type__")) =>
    array

// From https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

// From https://stackoverflow.com/questions/48750647/get-type-of-union-by-discriminant
// To use, you'll need a generic type argument, e.g.
// type LookupNodeByType = <T extends NodeType["type"]> = LookupByDiscriminate<NodeType, "type", T>
export type LookupByDiscriminate<
  UnionType,
  Key extends keyof UnionType,
  Value extends UnionType[Key],
> = UnionType extends Record<Key, Value> ? UnionType : never

// From https://stackoverflow.com/questions/49401866/all-possible-keys-of-an-union-type
export type KeysOfUnion<T> = T extends T ? keyof T : never
// Utility type to get members of a union that have a specific key
export type ExtractWithKey<T, K extends string | number | symbol> = T extends { [P in K]: any } ? T : never

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type DeepWriteable<T> = T extends object
  ? { -readonly [P in keyof T]: DeepWriteable<T[P]> }
  : T extends Array<any>
  ? Array<DeepWriteable<T[number]>>
  : T

export type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends object
  ? {
      readonly [P in keyof T]: DeepReadonly<T[P]>
    }
  : T
