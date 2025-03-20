import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherWifi = React.forwardRef(function SvgFeatherWifi(
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
          <path d="M5 13a10 10 0 0 1 14 0" />
          <path d="M8.5 16.5a5 5 0 0 1 7 0" />
          <path d="M2 8.82a15 15 0 0 1 20 0" />
          <line x1={12} x2={12.01} y1={20} y2={20} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherWifi
