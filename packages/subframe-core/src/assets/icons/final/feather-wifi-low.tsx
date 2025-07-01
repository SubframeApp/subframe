import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherWifiLow = React.forwardRef(function SvgFeatherWifiLow(
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
          <path d="M12 20h.01" />
          <path d="M8.5 16.429a5 5 0 0 1 7 0" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherWifiLow
