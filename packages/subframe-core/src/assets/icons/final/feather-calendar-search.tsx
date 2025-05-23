import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalendarSearch = React.forwardRef(function SvgFeatherCalendarSearch(
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
          <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7.5" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h18" />
          <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6v0Z" />
          <path d="m22 22-1.5-1.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalendarSearch
