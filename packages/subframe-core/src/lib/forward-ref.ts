/**
 * React 19 compatible forwardRef utility
 *
 * This utility provides a type-safe wrapper around React.forwardRef that works
 * with both React 18 and React 19 TypeScript definitions.
 *
 * Background:
 * - React 19 changed JSX types to support async components (returning ReactNode | Promise<ReactNode>)
 * - ForwardRefExoticComponent from React.forwardRef is not assignable to the new JSX element type
 * - This causes TypeScript errors when using @types/react ^19 with forwardRef components
 *
 * Solution:
 * - Cast the ForwardRefExoticComponent to a function component type
 * - This maintains runtime behavior while satisfying TypeScript in both React 18 and 19
 * - Preserves ref forwarding, display names, and all other forwardRef features
 */

import React from "react"

/**
 * Type for components created with forwardRef that's compatible with React 18 and React 19 JSX types.
 * This intersects ForwardRefExoticComponent with a function type to satisfy both type systems.
 */
type ForwardRefComponent<T, P> = React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> & {
  (props: P & React.RefAttributes<T>): React.ReactNode
}

/**
 * A type-safe forwardRef utility compatible with React 18 and React 19.
 *
 * This utility wraps React.forwardRef and casts the result to a type that's compatible
 * with both React 18 and React 19 JSX type systems. The intersection with a function
 * type satisfies React 19's stricter JSX requirements while maintaining the
 * ForwardRefExoticComponent interface for React 18.
 *
 * Usage:
 * ```tsx
 * import { forwardRef } from "./lib/forward-ref"
 *
 * interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
 *   variant?: "default" | "primary"
 * }
 *
 * export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
 *   function MyComponent({ variant = "default", ...props }, ref) {
 *     return <div ref={ref} data-variant={variant} {...props} />
 *   }
 * )
 * ```
 *
 * @param render - The render function that receives props and ref
 * @returns A component that can be used in JSX with React 18 and React 19
 */
export function forwardRef<T, P = {}>(
  render: React.ForwardRefRenderFunction<T, P>,
): ForwardRefComponent<T, P> {
  const component = React.forwardRef<T, P>(render)

  // Cast to our intersection type that satisfies both React 18 and React 19 JSX requirements.
  // At runtime, the component remains a standard ForwardRefExoticComponent with full functionality.
  // At compile time, TypeScript sees both the ForwardRefExoticComponent interface and a function signature.
  return component as ForwardRefComponent<T, P>
}
