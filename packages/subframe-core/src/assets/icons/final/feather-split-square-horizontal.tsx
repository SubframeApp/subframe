import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSplitSquareHorizontal = React.forwardRef(function SvgFeatherSplitSquareHorizontal(
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
          <path d="M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" />
          <path d="M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" />
          <line x1={12} x2={12} y1={4} y2={20} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSplitSquareHorizontal
