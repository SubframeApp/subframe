import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMinimize2 = React.forwardRef(function SvgFeatherMinimize2(
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
          <polyline points="4 14 10 14 10 20" />
          <polyline points="20 10 14 10 14 4" />
          <line x1={14} x2={21} y1={10} y2={3} />
          <line x1={3} x2={10} y1={21} y2={14} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMinimize2
