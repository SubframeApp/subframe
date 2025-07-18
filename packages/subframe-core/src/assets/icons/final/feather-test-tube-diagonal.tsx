import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTestTubeDiagonal = React.forwardRef(function SvgFeatherTestTubeDiagonal(
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
          <path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3" />
          <path d="m16 2 6 6" />
          <path d="M12 16H4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTestTubeDiagonal
