import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCast = React.forwardRef(function SvgFeatherCast(
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
          <path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
          <path d="M2 12a9 9 0 0 1 8 8" />
          <path d="M2 16a5 5 0 0 1 4 4" />
          <line x1={2} x2={2.01} y1={20} y2={20} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCast
