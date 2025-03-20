import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSkipBack = React.forwardRef(function SvgFeatherSkipBack(
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
          <polygon points="19 20 9 12 19 4 19 20" />
          <line x1={5} x2={5} y1={19} y2={5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSkipBack
