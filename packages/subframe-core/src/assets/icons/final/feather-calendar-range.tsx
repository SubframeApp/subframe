import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalendarRange = React.forwardRef(function SvgFeatherCalendarRange(
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
          <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
          <line x1={16} x2={16} y1={2} y2={6} />
          <line x1={8} x2={8} y1={2} y2={6} />
          <line x1={3} x2={21} y1={10} y2={10} />
          <path d="M17 14h-6" />
          <path d="M13 18H7" />
          <path d="M7 14h.01" />
          <path d="M17 18h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalendarRange
