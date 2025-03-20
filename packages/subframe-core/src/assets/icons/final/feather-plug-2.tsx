import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPlug2 = React.forwardRef(function SvgFeatherPlug2(
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
          <path d="M9 2v6" />
          <path d="M15 2v6" />
          <path d="M12 17v5" />
          <path d="M5 8h14" />
          <path d="M6 11V8h12v3a6 6 0 1 1-12 0v0Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPlug2
