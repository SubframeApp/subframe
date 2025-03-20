import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCastle = React.forwardRef(function SvgFeatherCastle(
  props: React.HTMLAttributes<HTMLSpanElement>,
  ref: React.Ref<HTMLSpanElement>,
) {
  return (
    <IconWrapper ref={ref} {...props}>
      {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
          <path d="M18 11V4H6v7" />
          <path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4" />
          <path d="M22 11V9" />
          <path d="M2 11V9" />
          <path d="M6 4V2" />
          <path d="M18 4V2" />
          <path d="M10 4V2" />
          <path d="M14 4V2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCastle
