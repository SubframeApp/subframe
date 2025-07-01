import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMessageSquareOff = React.forwardRef(function SvgFeatherMessageSquareOff(
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
          <path d="M21 15V5a2 2 0 0 0-2-2H9" />
          <path d="m2 2 20 20" />
          <path d="M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMessageSquareOff
