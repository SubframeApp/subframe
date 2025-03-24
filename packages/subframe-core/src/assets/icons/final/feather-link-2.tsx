import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLink2 = React.forwardRef(function SvgFeatherLink2(
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
          <path d="M9 17H7A5 5 0 0 1 7 7h2" />
          <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
          <line x1={8} x2={16} y1={12} y2={12} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLink2
