import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowDownRightFromCircle = React.forwardRef(function SvgFeatherArrowDownRightFromCircle(
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
          <path d="M12 22a10 10 0 1 1 10-10" />
          <path d="M22 22 12 12" />
          <path d="M22 16v6h-6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowDownRightFromCircle
