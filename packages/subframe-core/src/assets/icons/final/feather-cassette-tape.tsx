import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCassetteTape = React.forwardRef(function SvgFeatherCassetteTape(
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
          <rect width={20} height={16} x={2} y={4} rx={2} />
          <circle cx={8} cy={10} r={2} />
          <path d="M8 12h8" />
          <circle cx={16} cy={10} r={2} />
          <path d="m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCassetteTape
