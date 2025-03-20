import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowBigDownDash = React.forwardRef(function SvgFeatherArrowBigDownDash(
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
          <path d="M15 5H9" />
          <path d="M15 9v3h4l-7 7-7-7h4V9h6z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowBigDownDash
