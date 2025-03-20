import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDices = React.forwardRef(function SvgFeatherDices(
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
          <rect width={12} height={12} x={2} y={10} rx={2} ry={2} />
          <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
          <path d="M6 18h.01" />
          <path d="M10 14h.01" />
          <path d="M15 6h.01" />
          <path d="M18 9h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDices
