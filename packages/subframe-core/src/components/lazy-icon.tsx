import dashify from "dashify"
import React, { HTMLAttributes, lazy, ReactNode, Suspense } from "react"
import { type IconName, iconNames } from "../generated/iconNames"
import { EmptyIcon } from "./icon"

export interface LazyIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName
  icon?: never
}

const iconMap = Object.fromEntries(
  iconNames.map((name) => {
    const fileName = dashify(name.replace(/_/g, "-"), { condense: true })
    return [name, lazy(() => import(`../assets/icons/final/${fileName}.js`))]
  }),
)

export const LazyIcon = React.forwardRef<HTMLSpanElement, LazyIconProps>((props, ref) => {
  const { name, ...otherProps } = props

  let children: ReactNode = null
  if (name === null) {
    children = null
  } else if (name === "empty") {
    children = <EmptyIcon />
  } else {
    const Icon = iconMap[name]
    if (!Icon) {
      console.warn(`Icon "${name}" not found.`)
      children = <EmptyIcon />
    }

    children = <Icon />
  }

  return (
    <span ref={ref} {...otherProps}>
      <Suspense fallback={<EmptyIcon />}>{children}</Suspense>
    </span>
  )
})

export default LazyIcon
