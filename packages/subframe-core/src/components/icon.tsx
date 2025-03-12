"use client"
import classNames from "classnames"
import React, { forwardRef, lazy, ReactNode, Suspense, useContext } from "react"
import { EagerIconProps } from "./eager-icon"
import styles from "./icon.module.css"
import { LazyIconProps } from "./lazy-icon"
import { SubframeContext } from "./subframe-context"
import { TreeshakableIconProps } from "./treeshakable-icon"

export const EmptyIcon = () => {
  return <svg width="1em" height="1em"></svg>
}

export type IconProps = EagerIconProps | LazyIconProps | TreeshakableIconProps

// These are lazy loaded because statically importing them would defeat the purpose of not bundling all icons in the library
const LazyEagerIcon = lazy(() => import("./eager-icon"))
const LazyLazyIcon = lazy(() => import("./lazy-icon"))
const LazyTreeshakableIcon = lazy(() => import("./treeshakable-icon"))

export const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const { className, ...otherProps } = props
  const subframeContext = useContext(SubframeContext)
  let iconType: "eager" | "experimental_lazy" = "eager"
  if (subframeContext?.iconType) {
    iconType = subframeContext.iconType
  }

  let children: ReactNode
  if ((props as any).icon) {
    children = (
      <LazyTreeshakableIcon ref={ref} icon={(props as any).icon} className={classNames(className, styles.root)} />
    )
  } else {
    switch (iconType) {
      case "eager":
      default:
        children = (
          <LazyEagerIcon
            ref={ref}
            name={(props as any).name}
            className={classNames(className, styles.root)}
            {...otherProps}
          />
        )
        break
      case "experimental_lazy":
        children = (
          <LazyLazyIcon
            ref={ref}
            name={(props as any).name}
            className={classNames(className, styles.root)}
            {...otherProps}
          />
        )
        break
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
