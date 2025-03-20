import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRadius = React.forwardRef(function SvgFeatherRadius(
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
          <path d="M20.34 17.52a10 10 0 1 0-2.82 2.82" />
          <circle cx={19} cy={19} r={2} />
          <path d="m13.41 13.41 4.18 4.18" />
          <circle cx={12} cy={12} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRadius
