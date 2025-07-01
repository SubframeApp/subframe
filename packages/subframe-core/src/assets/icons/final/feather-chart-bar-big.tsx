import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChartBarBig = React.forwardRef(function SvgFeatherChartBarBig(
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
          <rect x={7} y={13} width={9} height={4} rx={1} />
          <rect x={7} y={5} width={12} height={4} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChartBarBig
