import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMonitorOff = React.forwardRef(function SvgFeatherMonitorOff(
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
          <path d="M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2" />
          <path d="M22 15V5a2 2 0 0 0-2-2H9" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="m2 2 20 20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMonitorOff
