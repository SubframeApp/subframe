import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherParkingMeter = React.forwardRef(function SvgFeatherParkingMeter(
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
          <path d="M9 9a3 3 0 1 1 6 0" />
          <path d="M12 12v3" />
          <path d="M11 15h2" />
          <path d="M19 9a7 7 0 1 0-13.6 2.3C6.4 14.4 8 19 8 19h8s1.6-4.6 2.6-7.7c.3-.8.4-1.5.4-2.3" />
          <path d="M12 19v3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherParkingMeter
