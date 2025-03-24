import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUser2 = React.forwardRef(function SvgFeatherUser2(
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
          <circle cx={12} cy={8} r={5} />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUser2
