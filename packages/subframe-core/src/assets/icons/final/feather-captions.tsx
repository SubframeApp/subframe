import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCaptions = React.forwardRef(function SvgFeatherCaptions(
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
          <rect width={18} height={14} x={3} y={5} rx={2} ry={2} />
          <path d="M7 15h4M15 15h2M7 11h2M13 11h4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCaptions
