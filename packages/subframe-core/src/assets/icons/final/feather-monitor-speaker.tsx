import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMonitorSpeaker = React.forwardRef(function SvgFeatherMonitorSpeaker(
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
          <path d="M5.5 20H8" />
          <path d="M17 9h.01" />
          <rect width={10} height={16} x={12} y={4} rx={2} />
          <path d="M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" />
          <circle cx={17} cy={15} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMonitorSpeaker
