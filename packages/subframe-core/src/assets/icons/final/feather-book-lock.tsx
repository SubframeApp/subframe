import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBookLock = React.forwardRef(function SvgFeatherBookLock(
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" />
          <path d="M20 15v7H6.5a2.5 2.5 0 0 1 0-5H20" />
          <rect width={8} height={5} x={12} y={6} rx={1} />
          <path d="M18 6V4a2 2 0 1 0-4 0v2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBookLock
