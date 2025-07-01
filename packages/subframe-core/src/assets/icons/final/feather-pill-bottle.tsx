import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPillBottle = React.forwardRef(function SvgFeatherPillBottle(
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
          <path d="M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4" />
          <path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
          <rect width={16} height={5} x={4} y={2} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPillBottle
