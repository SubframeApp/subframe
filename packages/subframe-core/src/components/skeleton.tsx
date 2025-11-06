"use client"

import classNames from "classnames"
import React from "react"
import { forwardRef } from "../lib/forward-ref"
import styles from "./skeleton.module.css"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(props, ref) {
  const { className, ...otherProps } = props
  return <div ref={ref} className={classNames(className, styles.root)} {...otherProps} />
})
