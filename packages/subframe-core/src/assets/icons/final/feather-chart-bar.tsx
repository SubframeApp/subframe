import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChartBar = React.forwardRef(function SvgFeatherChartBar(
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
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="M7 16h8" />
          <path d="M7 11h12" />
          <path d="M7 6h3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChartBar
