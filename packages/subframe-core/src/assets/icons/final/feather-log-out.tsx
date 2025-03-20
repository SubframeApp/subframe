import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLogOut = React.forwardRef(function SvgFeatherLogOut(
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
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1={21} x2={9} y1={12} y2={12} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLogOut
