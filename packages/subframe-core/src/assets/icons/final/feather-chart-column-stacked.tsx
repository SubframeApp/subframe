import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChartColumnStacked = React.forwardRef(function SvgFeatherChartColumnStacked(
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
          <path d="M11 13H7" />
          <path d="M19 9h-4" />
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <rect x={15} y={5} width={4} height={12} rx={1} />
          <rect x={7} y={8} width={4} height={9} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChartColumnStacked
