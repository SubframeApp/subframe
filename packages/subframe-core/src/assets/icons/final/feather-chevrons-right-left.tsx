import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherChevronsRightLeft = React.forwardRef(function SvgFeatherChevronsRightLeft(
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
          <path d="m20 17-5-5 5-5" />
          <path d="m4 17 5-5-5-5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherChevronsRightLeft
