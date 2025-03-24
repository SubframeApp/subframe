import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShieldQuestion = React.forwardRef(function SvgFeatherShieldQuestion(
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShieldQuestion
