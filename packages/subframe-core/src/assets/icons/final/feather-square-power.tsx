import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquarePower = React.forwardRef(function SvgFeatherSquarePower(
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
          <path d="M12 7v4" />
          <path d="M7.998 9.003a5 5 0 1 0 8-.005" />
          <rect x={3} y={3} width={18} height={18} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquarePower
