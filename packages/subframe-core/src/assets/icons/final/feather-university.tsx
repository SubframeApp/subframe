import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUniversity = React.forwardRef(function SvgFeatherUniversity(
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
          <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
          <path d="M18 12h.01" />
          <path d="M18 16h.01" />
          <path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
          <path d="M6 12h.01" />
          <path d="M6 16h.01" />
          <circle cx={12} cy={10} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUniversity
