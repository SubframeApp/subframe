import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowUpRightFromCircle = React.forwardRef(function SvgFeatherArrowUpRightFromCircle(
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
          <path d="M22 12A10 10 0 1 1 12 2" />
          <path d="M22 2 12 12" />
          <path d="M16 2h6v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowUpRightFromCircle
