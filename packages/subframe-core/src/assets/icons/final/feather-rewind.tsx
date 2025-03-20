import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRewind = React.forwardRef(function SvgFeatherRewind(
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
          <polygon points="11 19 2 12 11 5 11 19" />
          <polygon points="22 19 13 12 22 5 22 19" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRewind
