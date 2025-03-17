"use client"
import React, { createContext, PropsWithChildren } from "react"

export type SubframeContextProps =
  | {
      iconType?: "eager" | "experimental_lazy"
    }
  | undefined

export const SubframeContext = createContext<SubframeContextProps>({
  iconType: "eager",
})

export const SubframeProvider = ({ children, ...value }: PropsWithChildren<SubframeContextProps>) => {
  return <SubframeContext.Provider value={value}>{children}</SubframeContext.Provider>
}
