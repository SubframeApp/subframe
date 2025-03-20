import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAnchor = React.forwardRef(function SvgFeatherAnchor(
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
          <circle cx={12} cy={5} r={3} />
          <line x1={12} x2={12} y1={22} y2={8} />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAnchor
