import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTouchpad = React.forwardRef(function SvgFeatherTouchpad(
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
          <rect width={20} height={16} x={2} y={4} rx={2} />
          <path d="M2 14h20" />
          <path d="M12 20v-6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTouchpad
