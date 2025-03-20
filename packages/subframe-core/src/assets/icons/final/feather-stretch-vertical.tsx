import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherStretchVertical = React.forwardRef(function SvgFeatherStretchVertical(
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
          <rect width={6} height={20} x={4} y={2} rx={2} />
          <rect width={6} height={20} x={14} y={2} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherStretchVertical
