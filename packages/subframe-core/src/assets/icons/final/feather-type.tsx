import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherType = React.forwardRef(function SvgFeatherType(
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
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1={9} x2={15} y1={20} y2={20} />
          <line x1={12} x2={12} y1={4} y2={20} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherType
