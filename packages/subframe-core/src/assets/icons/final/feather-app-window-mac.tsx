import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAppWindowMac = React.forwardRef(function SvgFeatherAppWindowMac(
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
          <path d="M6 8h.01" />
          <path d="M10 8h.01" />
          <path d="M14 8h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAppWindowMac
