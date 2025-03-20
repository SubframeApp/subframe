import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTouchpadOff = React.forwardRef(function SvgFeatherTouchpadOff(
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
          <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16" />
          <path d="M2 14h12" />
          <path d="M22 14h-2" />
          <path d="M12 20v-6" />
          <path d="m2 2 20 20" />
          <path d="M22 16V6a2 2 0 0 0-2-2H10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTouchpadOff
