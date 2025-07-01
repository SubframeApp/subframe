import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherALargeSmall = React.forwardRef(function SvgFeatherALargeSmall(
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
          <path d="M21 14h-5" />
          <path d="M16 16v-3.5a2.5 2.5 0 0 1 5 0V16" />
          <path d="M4.5 13h6" />
          <path d="m3 16 4.5-9 4.5 9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherALargeSmall
