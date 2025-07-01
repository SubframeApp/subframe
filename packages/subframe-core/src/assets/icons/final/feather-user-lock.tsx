import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserLock = React.forwardRef(function SvgFeatherUserLock(
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
          <circle cx={10} cy={7} r={4} />
          <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
          <path d="M15 15.5V14a2 2 0 0 1 4 0v1.5" />
          <rect width={8} height={5} x={13} y={16} rx={0.899} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserLock
