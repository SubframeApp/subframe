import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRulerDimensionLine = React.forwardRef(function SvgFeatherRulerDimensionLine(
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
          <path d="M12 15v-3.014" />
          <path d="M16 15v-3.014" />
          <path d="M20 6H4" />
          <path d="M20 8V4" />
          <path d="M4 8V4" />
          <path d="M8 15v-3.014" />
          <rect x={3} y={12} width={18} height={7} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRulerDimensionLine
