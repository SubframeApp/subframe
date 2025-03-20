import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBadgeAlert = React.forwardRef(function SvgFeatherBadgeAlert(
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
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <line x1={12} x2={12} y1={8} y2={12} />
          <line x1={12} x2={12.01} y1={16} y2={16} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBadgeAlert
