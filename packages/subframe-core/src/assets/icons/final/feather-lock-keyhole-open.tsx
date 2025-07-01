import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLockKeyholeOpen = React.forwardRef(function SvgFeatherLockKeyholeOpen(
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
          <circle cx={12} cy={16} r={1} />
          <rect width={18} height={12} x={3} y={10} rx={2} />
          <path d="M7 10V7a5 5 0 0 1 9.33-2.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLockKeyholeOpen
