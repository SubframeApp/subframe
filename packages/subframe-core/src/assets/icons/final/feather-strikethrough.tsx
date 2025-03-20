import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherStrikethrough = React.forwardRef(function SvgFeatherStrikethrough(
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
          <path d="M16 4H9a3 3 0 0 0-2.83 4" />
          <path d="M14 12a4 4 0 0 1 0 8H6" />
          <line x1={4} x2={20} y1={12} y2={12} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherStrikethrough
