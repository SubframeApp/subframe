import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMapPin = React.forwardRef(function SvgFeatherMapPin(
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
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx={12} cy={10} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMapPin
