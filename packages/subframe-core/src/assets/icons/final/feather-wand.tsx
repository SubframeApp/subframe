import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherWand = React.forwardRef(function SvgFeatherWand(
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
          <path d="M15 4V2" />
          <path d="M15 16v-2" />
          <path d="M8 9h2" />
          <path d="M20 9h2" />
          <path d="M17.8 11.8 19 13" />
          <path d="M15 9h0" />
          <path d="M17.8 6.2 19 5" />
          <path d="m3 21 9-9" />
          <path d="M12.2 6.2 11 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherWand
