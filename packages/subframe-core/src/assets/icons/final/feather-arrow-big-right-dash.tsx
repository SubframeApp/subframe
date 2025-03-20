import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowBigRightDash = React.forwardRef(function SvgFeatherArrowBigRightDash(
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
          <path d="M5 9v6" />
          <path d="M9 9h3V5l7 7-7 7v-4H9V9z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowBigRightDash
