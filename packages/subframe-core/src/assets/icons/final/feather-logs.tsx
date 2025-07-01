import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLogs = React.forwardRef(function SvgFeatherLogs(
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
          <path d="M13 12h8" />
          <path d="M13 18h8" />
          <path d="M13 6h8" />
          <path d="M3 12h1" />
          <path d="M3 18h1" />
          <path d="M3 6h1" />
          <path d="M8 12h1" />
          <path d="M8 18h1" />
          <path d="M8 6h1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLogs
