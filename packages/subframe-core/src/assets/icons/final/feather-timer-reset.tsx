import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTimerReset = React.forwardRef(function SvgFeatherTimerReset(
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
          <path d="M12 14v-4" />
          <path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
          <path d="M9 17H4v5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTimerReset
