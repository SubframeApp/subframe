import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCaseUpper = React.forwardRef(function SvgFeatherCaseUpper(
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
          <path d="m3 15 4-8 4 8" />
          <path d="M4 13h6" />
          <path d="M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCaseUpper
