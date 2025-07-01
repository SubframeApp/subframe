import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalendarArrowDown = React.forwardRef(function SvgFeatherCalendarArrowDown(
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
          <path d="m14 18 4 4 4-4" />
          <path d="M16 2v4" />
          <path d="M18 14v8" />
          <path d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalendarArrowDown
