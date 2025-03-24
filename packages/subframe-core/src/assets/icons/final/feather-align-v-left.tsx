import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignVLeft = React.forwardRef(function SvgFeatherAlignVLeft(
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
          <path d="M4 6H14M4 12H20M4 18H10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignVLeft
