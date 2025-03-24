import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCombine = React.forwardRef(function SvgFeatherCombine(
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
          <rect width={8} height={8} x={2} y={2} rx={2} />
          <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
          <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
          <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
          <polyline points="7 21 10 18 7 15" />
          <rect width={8} height={8} x={14} y={14} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCombine
