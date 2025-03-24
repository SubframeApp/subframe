import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGanttChart = React.forwardRef(function SvgFeatherGanttChart(
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
          <path d="M8 6h10" />
          <path d="M6 12h9" />
          <path d="M11 18h7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGanttChart
