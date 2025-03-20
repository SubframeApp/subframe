import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSnowflake = React.forwardRef(function SvgFeatherSnowflake(
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
          <line x1={2} x2={22} y1={12} y2={12} />
          <line x1={12} x2={12} y1={2} y2={22} />
          <path d="m20 16-4-4 4-4" />
          <path d="m4 8 4 4-4 4" />
          <path d="m16 4-4 4-4-4" />
          <path d="m8 20 4-4 4 4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSnowflake
