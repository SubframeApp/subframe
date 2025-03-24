import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCornerLarge = React.forwardRef(function SvgFeatherCornerLarge(
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
          <path d="M4 21V16C4 9.37258 9.37258 4 16 4H21" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCornerLarge
