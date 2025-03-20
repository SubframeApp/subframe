import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalendarClock = React.forwardRef(function SvgFeatherCalendarClock(
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
          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h5" />
          <path d="M17.5 17.5 16 16.25V14" />
          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalendarClock
