import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherEqualNot = React.forwardRef(function SvgFeatherEqualNot(
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
          <line x1={5} x2={19} y1={9} y2={9} />
          <line x1={5} x2={19} y1={15} y2={15} />
          <line x1={19} x2={5} y1={5} y2={19} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherEqualNot
