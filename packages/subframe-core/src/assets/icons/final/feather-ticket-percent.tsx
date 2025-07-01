import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTicketPercent = React.forwardRef(function SvgFeatherTicketPercent(
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
          <path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M9 9h.01" />
          <path d="m15 9-6 6" />
          <path d="M15 15h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTicketPercent
