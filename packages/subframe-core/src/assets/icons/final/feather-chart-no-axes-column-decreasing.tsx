import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChartNoAxesColumnDecreasing = React.forwardRef(function SvgFeatherChartNoAxesColumnDecreasing(
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
          <path d="M12 20V10" />
          <path d="M18 20v-4" />
          <path d="M6 20V4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChartNoAxesColumnDecreasing
