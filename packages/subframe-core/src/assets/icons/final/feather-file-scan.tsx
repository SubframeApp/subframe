import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileScan = React.forwardRef(function SvgFeatherFileScan(
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
          <path d="M20 10V7.5L14.5 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h4.5" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M16 22a2 2 0 0 1-2-2" />
          <path d="M20 22a2 2 0 0 0 2-2" />
          <path d="M20 14a2 2 0 0 1 2 2" />
          <path d="M16 14a2 2 0 0 0-2 2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileScan
