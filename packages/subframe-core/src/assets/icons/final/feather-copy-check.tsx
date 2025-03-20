import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCopyCheck = React.forwardRef(function SvgFeatherCopyCheck(
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
          <path d="m12 15 2 2 4-4" />
          <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCopyCheck
