import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowRightFromLine = React.forwardRef(function SvgFeatherArrowRightFromLine(
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
          <path d="M3 5v14" />
          <path d="M21 12H7" />
          <path d="m15 18 6-6-6-6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowRightFromLine
