import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowDownRight = React.forwardRef(function SvgFeatherArrowDownRight(
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
          <path d="m7 7 10 10" />
          <path d="M17 7v10H7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowDownRight
