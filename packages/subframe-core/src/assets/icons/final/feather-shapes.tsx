import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShapes = React.forwardRef(function SvgFeatherShapes(
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
          <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
          <rect x={3} y={14} width={7} height={7} rx={1} />
          <circle cx={17.5} cy={17.5} r={3.5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShapes
