import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowUpAZ = React.forwardRef(function SvgFeatherArrowUpAZ(
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
          <path d="m3 8 4-4 4 4" />
          <path d="M7 4v16" />
          <path d="M20 8h-5" />
          <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
          <path d="M15 14h5l-5 6h5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowUpAZ
