import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUnlock = React.forwardRef(function SvgFeatherUnlock(
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
          <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUnlock
