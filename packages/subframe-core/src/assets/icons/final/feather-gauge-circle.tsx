import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGaugeCircle = React.forwardRef(function SvgFeatherGaugeCircle(
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
          <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
          <circle cx={12} cy={12} r={2} />
          <path d="M13.4 10.6 19 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGaugeCircle
