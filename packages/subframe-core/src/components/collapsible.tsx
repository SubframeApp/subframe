"use client"

import * as RadixCollapsible from "@radix-ui/react-collapsible"
import { Slot, SlotProps } from "@radix-ui/react-slot"
import classNames from "classnames"
import React from "react"
import { forwardRef } from "../lib/forward-ref"
import styles from "./collapsible.module.css"

interface ChevronProps extends SlotProps {}
export const Chevron = forwardRef<HTMLElement, ChevronProps>(function CollapsibleChevron(
  { className, ...otherProps }: ChevronProps,
  ref,
) {
  return <Slot ref={ref} className={classNames(className, styles.chevron)} {...otherProps} />
})

export const Trigger = forwardRef<HTMLButtonElement, RadixCollapsible.CollapsibleTriggerProps>(function Trigger(
  { className, children, ...otherProps },
  ref,
) {
  return (
    <RadixCollapsible.Trigger className={classNames(className, styles.trigger)} ref={ref} {...otherProps}>
      {children}
    </RadixCollapsible.Trigger>
  )
})

export const Content = forwardRef<HTMLDivElement, RadixCollapsible.CollapsibleContentProps>(function Content(
  { className, children, ...otherProps },
  ref,
) {
  return (
    <RadixCollapsible.Content className={classNames(className, styles.content)} ref={ref} {...otherProps}>
      {children}
    </RadixCollapsible.Content>
  )
})

export const Root = RadixCollapsible.Root

export const Collapsible = {
  Root,
  Trigger,
  Content,
  Chevron,
}
