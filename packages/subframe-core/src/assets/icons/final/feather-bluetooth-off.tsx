import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBluetoothOff = React.forwardRef(function SvgFeatherBluetoothOff(
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
          <path d="m17 17-5 5V12l-5 5" />
          <path d="m2 2 20 20" />
          <path d="M14.5 9.5 17 7l-5-5v4.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBluetoothOff
