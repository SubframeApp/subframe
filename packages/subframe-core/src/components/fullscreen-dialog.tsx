"use client"

import * as RadixDialog from "@radix-ui/react-dialog"
import classNames from "classnames"
import React from "react"
import { forwardRef } from "../lib/forward-ref"
import styles from "./fullscreen-dialog.module.css"

interface RootProps extends RadixDialog.DialogProps, RadixDialog.DialogOverlayProps {}

export const Root = forwardRef<HTMLDivElement, RootProps>(function FullScreenDialog(
  { className, defaultOpen, open, onOpenChange, modal, ...otherProps },
  ref,
) {
  return (
    <RadixDialog.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} modal={modal}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.root}>
          <RadixDialog.Content ref={ref} asChild className={classNames(className, styles.content)} {...otherProps} />
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
})

export const FullScreenDialog = { Root }
