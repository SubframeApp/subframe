import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShieldOff = React.forwardRef(function SvgFeatherShieldOff(
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
          <path d="M19.7 14a6.9 6.9 0 0 0 .3-2V5l-8-3-3.2 1.2" />
          <path d="m2 2 20 20" />
          <path d="M4.7 4.7 4 5v7c0 6 8 10 8 10a20.3 20.3 0 0 0 5.62-4.38" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShieldOff
