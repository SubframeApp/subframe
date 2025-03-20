import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPercentDiamond = React.forwardRef(function SvgFeatherPercentDiamond(
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
          <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z" />
          <path d="M9.2 9.2h.01" />
          <path d="m14.5 9.5-5 5" />
          <path d="M14.7 14.8h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPercentDiamond
