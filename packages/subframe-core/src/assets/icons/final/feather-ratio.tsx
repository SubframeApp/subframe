import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRatio = React.forwardRef(function SvgFeatherRatio(
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
          <rect width={12} height={20} x={6} y={2} rx={2} />
          <rect width={20} height={12} x={2} y={6} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRatio
