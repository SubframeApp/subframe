import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListOrdered = React.forwardRef(function SvgFeatherListOrdered(
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
          <line x1={10} x2={21} y1={6} y2={6} />
          <line x1={10} x2={21} y1={12} y2={12} />
          <line x1={10} x2={21} y1={18} y2={18} />
          <path d="M4 6h1v4" />
          <path d="M4 10h2" />
          <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListOrdered
