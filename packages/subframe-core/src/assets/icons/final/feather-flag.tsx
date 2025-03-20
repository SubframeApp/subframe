import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFlag = React.forwardRef(function SvgFeatherFlag(
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
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1={4} x2={4} y1={22} y2={15} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFlag
