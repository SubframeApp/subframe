import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRotateCcwSquare = React.forwardRef(function SvgFeatherRotateCcwSquare(
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
          <path d="M20 9V7a2 2 0 0 0-2-2h-6" />
          <path d="m15 2-3 3 3 3" />
          <path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRotateCcwSquare
