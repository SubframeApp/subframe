import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserRoundPlus = React.forwardRef(function SvgFeatherUserRoundPlus(
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
          <path d="M2 21a8 8 0 0 1 13.292-6" />
          <circle cx={10} cy={8} r={5} />
          <path d="M19 16v6" />
          <path d="M22 19h-6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserRoundPlus
