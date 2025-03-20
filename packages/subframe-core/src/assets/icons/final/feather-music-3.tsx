import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMusic3 = React.forwardRef(function SvgFeatherMusic3(
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
          <circle cx={12} cy={18} r={4} />
          <path d="M16 18V2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMusic3
