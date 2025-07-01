import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalendarMinus2 = React.forwardRef(function SvgFeatherCalendarMinus2(
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
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width={18} height={18} x={3} y={4} rx={2} />
          <path d="M3 10h18" />
          <path d="M10 16h4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalendarMinus2
