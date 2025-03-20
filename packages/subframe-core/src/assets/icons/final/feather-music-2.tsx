import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMusic2 = React.forwardRef(function SvgFeatherMusic2(
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
          <circle cx={8} cy={18} r={4} />
          <path d="M12 18V2l7 4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMusic2
