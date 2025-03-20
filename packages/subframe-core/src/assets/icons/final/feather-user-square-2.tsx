import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserSquare2 = React.forwardRef(function SvgFeatherUserSquare2(
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
          <path d="M18 21a6 6 0 0 0-12 0" />
          <circle cx={12} cy={11} r={4} />
          <rect width={18} height={18} x={3} y={3} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserSquare2
