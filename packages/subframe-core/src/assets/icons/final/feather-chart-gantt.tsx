import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChartGantt = React.forwardRef(function SvgFeatherChartGantt(
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
          <path d="M10 6h8" />
          <path d="M12 16h6" />
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="M8 11h7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChartGantt
