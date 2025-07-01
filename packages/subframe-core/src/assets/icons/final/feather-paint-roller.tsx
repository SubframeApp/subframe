import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPaintRoller = React.forwardRef(function SvgFeatherPaintRoller(
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
          <rect width={16} height={6} x={2} y={2} rx={2} />
          <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect width={4} height={6} x={8} y={16} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPaintRoller
