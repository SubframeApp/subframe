import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTimerOff = React.forwardRef(function SvgFeatherTimerOff(
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
          <path d="M10 2h4" />
          <path d="M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7" />
          <path d="M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2" />
          <path d="m2 2 20 20" />
          <path d="M12 12v-2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTimerOff
