import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMusic4 = React.forwardRef(function SvgFeatherMusic4(
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
          <path d="M9 18V5l12-2v13" />
          <path d="m9 9 12-2" />
          <circle cx={6} cy={18} r={3} />
          <circle cx={18} cy={16} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMusic4
