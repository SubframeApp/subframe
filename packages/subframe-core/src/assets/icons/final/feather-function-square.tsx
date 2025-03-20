import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFunctionSquare = React.forwardRef(function SvgFeatherFunctionSquare(
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
          <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
          <path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" />
          <path d="M9 11.2h5.7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFunctionSquare
