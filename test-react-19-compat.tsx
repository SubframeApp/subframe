/**
 * Minimal reproduction for React 19 type compatibility issue
 *
 * ## Problem
 * When using @types/react ^19 with components created using React.forwardRef,
 * TypeScript produces the following error:
 *
 * ```
 * 'Loader' cannot be used as a JSX component.
 * Its type 'ForwardRefExoticComponent<LoaderProps & RefAttributes<HTMLDivElement>>'
 * is not a valid JSX element type.
 * ```
 *
 * ## Root Cause
 * React 19 changed JSX types to support async components (returning ReactNode | Promise<ReactNode>).
 * ForwardRefExoticComponent is not assignable to the new JSX element type.
 *
 * ## Solution
 * Subframe now provides a React 19-compatible forwardRef utility that casts the
 * ForwardRefExoticComponent to an intersection type that satisfies both React 18
 * and React 19 JSX type systems.
 */

import React from "react"

// ========================================
// BEFORE: Using React.forwardRef directly
// ========================================
interface LoaderPropsOld extends React.HTMLAttributes<HTMLDivElement> {}

const LoaderOld = React.forwardRef<HTMLDivElement, LoaderPropsOld>(function Loader(props, ref) {
  return <div ref={ref} {...props} />
})

// This will cause TypeScript errors in React 19:
// ❌ Type 'ForwardRefExoticComponent<...>' is not a valid JSX element type
function AppBefore() {
  return (
    <div>
      {/* @ts-expect-error React 19 JSX type compatibility - users had to do this */}
      <LoaderOld className="test" />
    </div>
  )
}

// ========================================
// AFTER: Using Subframe's forwardRef utility
// ========================================

// Simplified version of Subframe's forwardRef utility
type ForwardRefComponent<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> & {
  (props: P & React.RefAttributes<T>): React.ReactNode
}

function forwardRef<T, P = {}>(
  render: React.ForwardRefRenderFunction<T, P>,
): ForwardRefComponent<T, P> {
  const component = React.forwardRef<T, P>(render)
  return component as ForwardRefComponent<T, P>
}

// Usage with the new utility
interface LoaderPropsNew extends React.HTMLAttributes<HTMLDivElement> {}

const LoaderNew = forwardRef<HTMLDivElement, LoaderPropsNew>(function Loader(props, ref) {
  return <div ref={ref} {...props} />
})

// This now works without TypeScript errors in both React 18 and React 19:
// ✅ No @ts-expect-error needed
function AppAfter() {
  return (
    <div>
      <LoaderNew className="test" />
    </div>
  )
}

// ========================================
// How to use in your project
// ========================================

/*
// Import from @subframe/core (v1.148.0+)
import { forwardRef } from "@subframe/core"

// Use it just like React.forwardRef
interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary"
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  function MyComponent({ variant = "default", ...props }, ref) {
    return <div ref={ref} data-variant={variant} {...props} />
  }
)

// Now works with React 19 types without any errors!
*/
