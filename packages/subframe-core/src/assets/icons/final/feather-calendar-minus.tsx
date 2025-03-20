import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalendarMinus = React.forwardRef(function SvgFeatherCalendarMinus(
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
          <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
          <line x1={16} x2={16} y1={2} y2={6} />
          <line x1={8} x2={8} y1={2} y2={6} />
          <line x1={3} x2={21} y1={10} y2={10} />
          <line x1={16} x2={22} y1={19} y2={19} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalendarMinus
