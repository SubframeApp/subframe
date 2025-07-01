import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListCheck = React.forwardRef(function SvgFeatherListCheck(
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
          <path d="M11 18H3" />
          <path d="m15 18 2 2 4-4" />
          <path d="M16 12H3" />
          <path d="M16 6H3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListCheck
