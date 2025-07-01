import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChartColumnDecreasing = React.forwardRef(function SvgFeatherChartColumnDecreasing(
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
          <path d="M13 17V9" />
          <path d="M18 17v-3" />
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="M8 17V5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChartColumnDecreasing
