import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCirclePower = React.forwardRef(function SvgFeatherCirclePower(
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
          <path d="M12 7v4" />
          <path d="M7.998 9.003a5 5 0 1 0 8-.005" />
          <circle cx={12} cy={12} r={10} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCirclePower
