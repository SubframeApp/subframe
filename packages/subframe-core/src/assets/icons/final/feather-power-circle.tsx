import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPowerCircle = React.forwardRef(function SvgFeatherPowerCircle(
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
          <circle cx={12} cy={12} r={10} />
          <path d="M12 12V6" />
          <path d="M8 7.5A6.1 6.1 0 0 0 12 18a6 6 0 0 0 4-10.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPowerCircle
