import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPause = React.forwardRef(function SvgFeatherPause(
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
          <rect width={4} height={16} x={6} y={4} />
          <rect width={4} height={16} x={14} y={4} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPause
