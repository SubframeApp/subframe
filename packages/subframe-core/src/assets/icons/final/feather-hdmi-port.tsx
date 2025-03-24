import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherHdmiPort = React.forwardRef(function SvgFeatherHdmiPort(
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
          <path d="M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z" />
          <path d="M7.5 12h9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherHdmiPort
