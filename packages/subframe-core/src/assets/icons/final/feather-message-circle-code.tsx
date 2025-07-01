import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMessageCircleCode = React.forwardRef(function SvgFeatherMessageCircleCode(
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
          <path d="M10 9.5 8 12l2 2.5" />
          <path d="m14 9.5 2 2.5-2 2.5" />
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMessageCircleCode
