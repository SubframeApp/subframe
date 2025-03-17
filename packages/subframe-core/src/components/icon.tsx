"use client"
import classNames from "classnames"
import React, { forwardRef, HTMLAttributes, lazy, ReactNode, Suspense, useContext } from "react"
import type { IconName } from "../generated/iconNames"
import styles from "./icon.module.css"
import { SubframeContext } from "./subframe-context"

export const EmptyIcon = () => {
  return <svg width="1em" height="1em"></svg>
}

// Note(Chris): I'd rather use TreeshakableIconProps | EagerIconProps | LazyIconProps, but TypeScript on the end-user's side doesn't like that since it's too dynamic apparently.
export type IconProps = HTMLAttributes<HTMLSpanElement> &
  (
    | {
        name: IconName
        icon?: undefined
      }
    | {
        icon: ReactNode
        name?: undefined
      }
  )

// These are lazy loaded because statically importing them would defeat the purpose of not bundling all icons in the library
const LazyEagerIcon = lazy(() => import("./eager-icon"))
const LazyLazyIcon = lazy(() => import("./lazy-icon"))
const LazyTreeshakableIcon = lazy(() => import("./treeshakable-icon"))

export const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { className, name, icon, ...otherProps } = props
  const subframeContext = useContext(SubframeContext)
  let iconType: "eager" | "experimental_lazy" = "eager"
  if (subframeContext?.iconType) {
    iconType = subframeContext.iconType
  }

  let children: ReactNode

  if (icon === undefined && name === undefined) {
    children = null
  } else {
    if (icon) {
      children = <LazyTreeshakableIcon ref={ref} icon={icon} className={classNames(className, styles.root)} />
    } else if (name) {
      switch (iconType) {
        case "eager":
        default:
          children = (
            <LazyEagerIcon ref={ref} name={name} className={classNames(className, styles.root)} {...otherProps} />
          )
          break
        case "experimental_lazy":
          children = (
            <LazyLazyIcon ref={ref} name={name} className={classNames(className, styles.root)} {...otherProps} />
          )
          break
      }
    }
  }

  let fallback: ReactNode = null
  if ((props as any).icon === null || (props as any).name === null) {
    fallback = null
  } else {
    fallback = <EmptyIcon />
  }

  return <Suspense fallback={fallback}>{children}</Suspense>
})
