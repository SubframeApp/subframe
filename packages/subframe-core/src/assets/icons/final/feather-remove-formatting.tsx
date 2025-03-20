import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRemoveFormatting = React.forwardRef(function SvgFeatherRemoveFormatting(
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
          <path d="M4 7V4h16v3" />
          <path d="M5 20h6" />
          <path d="M13 4 8 20" />
          <path d="m15 15 5 5" />
          <path d="m20 15-5 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRemoveFormatting
