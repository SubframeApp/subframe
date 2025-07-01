import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherIndentIncrease = React.forwardRef(function SvgFeatherIndentIncrease(
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
          <path d="M21 12H11" />
          <path d="M21 18H11" />
          <path d="M21 6H11" />
          <path d="m3 8 4 4-4 4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherIndentIncrease
