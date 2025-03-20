import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTerminal = React.forwardRef(function SvgFeatherTerminal(
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
          <polyline points="4 17 10 11 4 5" />
          <line x1={12} x2={20} y1={19} y2={19} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTerminal
