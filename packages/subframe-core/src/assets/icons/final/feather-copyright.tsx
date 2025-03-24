import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCopyright = React.forwardRef(function SvgFeatherCopyright(
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
          <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCopyright
