import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileLock2 = React.forwardRef(function SvgFeatherFileLock2(
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
          <path d="M4 5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H4" />
          <polyline points="14 2 14 8 20 8" />
          <rect width={8} height={5} x={2} y={13} rx={1} />
          <path d="M8 13v-2a2 2 0 1 0-4 0v2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileLock2
