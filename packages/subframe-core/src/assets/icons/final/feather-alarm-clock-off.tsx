import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlarmClockOff = React.forwardRef(function SvgFeatherAlarmClockOff(
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
          <path d="M6.87 6.87a8 8 0 1 0 11.26 11.26" />
          <path d="M19.9 14.25a8 8 0 0 0-9.15-9.15" />
          <path d="m22 6-3-3" />
          <path d="M6.26 18.67 4 21" />
          <path d="m2 2 20 20" />
          <path d="M4 4 2 6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlarmClockOff
