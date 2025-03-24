import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCornerRightUp = React.forwardRef(function SvgFeatherCornerRightUp(
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
          <polyline points="10 9 15 4 20 9" />
          <path d="M4 20h7a4 4 0 0 0 4-4V4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCornerRightUp
