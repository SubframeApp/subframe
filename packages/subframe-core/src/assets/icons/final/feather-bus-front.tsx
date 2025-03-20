import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBusFront = React.forwardRef(function SvgFeatherBusFront(
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
          <path d="M4 6 2 7" />
          <path d="M10 6h4" />
          <path d="m22 7-2-1" />
          <rect width={16} height={16} x={4} y={3} rx={2} />
          <path d="M4 11h16" />
          <path d="M8 15h.01" />
          <path d="M16 15h.01" />
          <path d="M6 19v2" />
          <path d="M18 21v-2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBusFront
