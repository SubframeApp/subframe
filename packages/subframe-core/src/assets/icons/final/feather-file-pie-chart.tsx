import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFilePieChart = React.forwardRef(function SvgFeatherFilePieChart(
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
          <path d="M16 22h2a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M4.04 11.71a5.84 5.84 0 1 0 8.2 8.29" />
          <path d="M13.83 16A5.83 5.83 0 0 0 8 10.17V16h5.83Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFilePieChart
