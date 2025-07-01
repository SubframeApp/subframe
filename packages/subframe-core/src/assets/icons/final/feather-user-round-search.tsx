import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserRoundSearch = React.forwardRef(function SvgFeatherUserRoundSearch(
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
          <circle cx={10} cy={8} r={5} />
          <path d="M2 21a8 8 0 0 1 10.434-7.62" />
          <circle cx={18} cy={18} r={3} />
          <path d="m22 22-1.9-1.9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserRoundSearch
