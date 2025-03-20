import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCodepen = React.forwardRef(function SvgFeatherCodepen(
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
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1={12} x2={12} y1={22} y2={15.5} />
          <polyline points="22 8.5 12 15.5 2 8.5" />
          <polyline points="2 15.5 12 8.5 22 15.5" />
          <line x1={12} x2={12} y1={2} y2={8.5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCodepen
