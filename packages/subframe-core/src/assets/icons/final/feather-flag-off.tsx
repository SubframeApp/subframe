import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFlagOff = React.forwardRef(function SvgFeatherFlagOff(
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
          <path d="M8 2c3 0 5 2 8 2s4-1 4-1v11" />
          <path d="M4 22V4" />
          <path d="M4 15s1-1 4-1 5 2 8 2" />
          <line x1={2} x2={22} y1={2} y2={22} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFlagOff
