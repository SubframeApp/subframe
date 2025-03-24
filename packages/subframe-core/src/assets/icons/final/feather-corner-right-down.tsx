import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCornerRightDown = React.forwardRef(function SvgFeatherCornerRightDown(
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
          <polyline points="10 15 15 20 20 15" />
          <path d="M4 4h7a4 4 0 0 1 4 4v12" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCornerRightDown
