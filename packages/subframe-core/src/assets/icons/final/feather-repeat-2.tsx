import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRepeat2 = React.forwardRef(function SvgFeatherRepeat2(
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
          <path d="m2 9 3-3 3 3" />
          <path d="M13 18H7a2 2 0 0 1-2-2V6" />
          <path d="m22 15-3 3-3-3" />
          <path d="M11 6h6a2 2 0 0 1 2 2v10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRepeat2
