import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileVideo2 = React.forwardRef(function SvgFeatherFileVideo2(
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
          <path d="M4 8V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m10 15.5 4 2.5v-6l-4 2.5" />
          <rect width={8} height={6} x={2} y={12} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileVideo2
