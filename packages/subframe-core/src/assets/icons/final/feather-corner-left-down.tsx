import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCornerLeftDown = React.forwardRef(function SvgFeatherCornerLeftDown(
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
          <polyline points="14 15 9 20 4 15" />
          <path d="M20 4h-7a4 4 0 0 0-4 4v12" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCornerLeftDown
