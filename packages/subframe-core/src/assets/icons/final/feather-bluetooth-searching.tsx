import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBluetoothSearching = React.forwardRef(function SvgFeatherBluetoothSearching(
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
          <path d="m7 7 10 10-5 5V2l5 5L7 17" />
          <path d="M20.83 14.83a4 4 0 0 0 0-5.66" />
          <path d="M18 12h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBluetoothSearching
