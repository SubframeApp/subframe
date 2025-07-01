import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTransgender = React.forwardRef(function SvgFeatherTransgender(
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
          <path d="M12 16v6" />
          <path d="M14 20h-4" />
          <path d="M18 2h4v4" />
          <path d="m2 2 7.17 7.17" />
          <path d="M2 5.355V2h3.357" />
          <path d="m22 2-7.17 7.17" />
          <path d="M8 5 5 8" />
          <circle cx={12} cy={12} r={4} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTransgender
