import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCircleOff = React.forwardRef(function SvgFeatherCircleOff(
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
          <path d="m2 2 20 20" />
          <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
          <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCircleOff
