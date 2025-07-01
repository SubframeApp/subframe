import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherClockAlert = React.forwardRef(function SvgFeatherClockAlert(
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
          <path d="M12 6v6l4 2" />
          <path d="M16 21.16a10 10 0 1 1 5-13.516" />
          <path d="M20 11.5v6" />
          <path d="M20 21.5h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherClockAlert
