import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSplitSquareVertical = React.forwardRef(function SvgFeatherSplitSquareVertical(
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
          <path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" />
          <path d="M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" />
          <line x1={4} x2={20} y1={12} y2={12} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSplitSquareVertical
