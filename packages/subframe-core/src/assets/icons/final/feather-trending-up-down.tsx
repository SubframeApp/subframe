import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTrendingUpDown = React.forwardRef(function SvgFeatherTrendingUpDown(
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
          <path d="M14.828 14.828 21 21" />
          <path d="M21 16v5h-5" />
          <path d="m21 3-9 9-4-4-6 6" />
          <path d="M21 8V3h-5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTrendingUpDown
