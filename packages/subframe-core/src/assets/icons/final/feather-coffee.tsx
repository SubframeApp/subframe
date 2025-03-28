import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCoffee = React.forwardRef(function SvgFeatherCoffee(
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
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1={6} x2={6} y1={2} y2={4} />
          <line x1={10} x2={10} y1={2} y2={4} />
          <line x1={14} x2={14} y1={2} y2={4} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCoffee
