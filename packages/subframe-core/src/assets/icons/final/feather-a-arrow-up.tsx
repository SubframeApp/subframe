import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAArrowUp = React.forwardRef(function SvgFeatherAArrowUp(
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
          <path d="M3.5 13h6" />
          <path d="m2 16 4.5-9 4.5 9" />
          <path d="M18 16V7" />
          <path d="m14 11 4-4 4 4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAArrowUp
