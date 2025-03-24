import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCornerLeftUp = React.forwardRef(function SvgFeatherCornerLeftUp(
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
          <polyline points="14 9 9 4 4 9" />
          <path d="M20 20h-7a4 4 0 0 1-4-4V4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCornerLeftUp
