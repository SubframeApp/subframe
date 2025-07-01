import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGrid3X2 = React.forwardRef(function SvgFeatherGrid3X2(
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
          <path d="M15 3v18" />
          <path d="M3 12h18" />
          <path d="M9 3v18" />
          <rect x={3} y={3} width={18} height={18} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGrid3X2
