import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCircleSlash = React.forwardRef(function SvgFeatherCircleSlash(
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
          <line x1={9} x2={15} y1={15} y2={9} />
          <circle cx={12} cy={12} r={10} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCircleSlash
