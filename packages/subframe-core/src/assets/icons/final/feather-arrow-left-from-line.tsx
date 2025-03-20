import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowLeftFromLine = React.forwardRef(function SvgFeatherArrowLeftFromLine(
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
          <path d="m9 6-6 6 6 6" />
          <path d="M3 12h14" />
          <path d="M21 19V5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowLeftFromLine
