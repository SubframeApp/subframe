import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherWashingMachine = React.forwardRef(function SvgFeatherWashingMachine(
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
          <path d="M3 6h3" />
          <path d="M17 6h.01" />
          <rect width={18} height={20} x={3} y={2} rx={2} />
          <circle cx={12} cy={13} r={5} />
          <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherWashingMachine
