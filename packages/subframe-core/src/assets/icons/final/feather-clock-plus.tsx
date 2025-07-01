import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherClockPlus = React.forwardRef(function SvgFeatherClockPlus(
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
          <path d="M12 6v6l3.644 1.822" />
          <path d="M16 19h6" />
          <path d="M19 16v6" />
          <path d="M21.92 13.267a10 10 0 1 0-8.653 8.653" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherClockPlus
