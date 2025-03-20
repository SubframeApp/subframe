import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMousePointerSquareDashed = React.forwardRef(function SvgFeatherMousePointerSquareDashed(
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
          <path d="M5 3a2 2 0 0 0-2 2" />
          <path d="M19 3a2 2 0 0 1 2 2" />
          <path d="m12 12 4 10 1.7-4.3L22 16Z" />
          <path d="M5 21a2 2 0 0 1-2-2" />
          <path d="M9 3h1" />
          <path d="M9 21h2" />
          <path d="M14 3h1" />
          <path d="M3 9v1" />
          <path d="M21 9v2" />
          <path d="M3 14v1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMousePointerSquareDashed
