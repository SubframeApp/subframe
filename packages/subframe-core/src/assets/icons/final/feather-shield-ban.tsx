import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShieldBan = React.forwardRef(function SvgFeatherShieldBan(
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m4 5 14 12" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShieldBan
