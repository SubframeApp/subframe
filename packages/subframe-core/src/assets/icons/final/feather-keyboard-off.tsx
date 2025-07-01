import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherKeyboardOff = React.forwardRef(function SvgFeatherKeyboardOff(
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
          <path d="M 20 4 A2 2 0 0 1 22 6" />
          <path d="M 22 6 L 22 16.41" />
          <path d="M 7 16 L 16 16" />
          <path d="M 9.69 4 L 20 4" />
          <path d="M14 8h.01" />
          <path d="M18 8h.01" />
          <path d="m2 2 20 20" />
          <path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
          <path d="M6 8h.01" />
          <path d="M8 12h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherKeyboardOff
