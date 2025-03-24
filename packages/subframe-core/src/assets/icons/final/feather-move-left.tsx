import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMoveLeft = React.forwardRef(function SvgFeatherMoveLeft(
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
          <path d="M6 8L2 12L6 16" />
          <path d="M2 12H22" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMoveLeft
