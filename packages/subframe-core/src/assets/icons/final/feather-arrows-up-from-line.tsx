import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowsUpFromLine = React.forwardRef(function SvgFeatherArrowsUpFromLine(
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
          <path d="m4 6 3-3 3 3" />
          <path d="M7 17V3" />
          <path d="m14 6 3-3 3 3" />
          <path d="M17 17V3" />
          <path d="M4 21h16" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowsUpFromLine
