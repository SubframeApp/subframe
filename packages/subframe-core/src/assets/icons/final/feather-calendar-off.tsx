import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalendarOff = React.forwardRef(function SvgFeatherCalendarOff(
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
          <path d="M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" />
          <path d="M21 15.5V6a2 2 0 0 0-2-2H9.5" />
          <path d="M16 2v4" />
          <path d="M3 10h7" />
          <path d="M21 10h-5.5" />
          <line x1={2} x2={22} y1={2} y2={22} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalendarOff
