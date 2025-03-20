import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBinary = React.forwardRef(function SvgFeatherBinary(
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
          <rect x={14} y={14} width={4} height={6} rx={2} />
          <rect x={6} y={4} width={4} height={6} rx={2} />
          <path d="M6 20h4" />
          <path d="M14 10h4" />
          <path d="M6 14h2v6" />
          <path d="M14 4h2v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBinary
