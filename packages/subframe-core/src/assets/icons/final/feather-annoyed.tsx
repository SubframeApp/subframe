import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAnnoyed = React.forwardRef(function SvgFeatherAnnoyed(
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
          <circle cx={12} cy={12} r={10} />
          <path d="M8 15h8" />
          <path d="M8 9h2" />
          <path d="M14 9h2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAnnoyed
