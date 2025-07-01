import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherEarthLock = React.forwardRef(function SvgFeatherEarthLock(
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
          <path d="M7 3.34V5a3 3 0 0 0 3 3" />
          <path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
          <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
          <path d="M12 2a10 10 0 1 0 9.54 13" />
          <path d="M20 6V4a2 2 0 1 0-4 0v2" />
          <rect width={8} height={5} x={14} y={6} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherEarthLock
