import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTramFront = React.forwardRef(function SvgFeatherTramFront(
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
          <rect width={16} height={16} x={4} y={3} rx={2} />
          <path d="M4 11h16" />
          <path d="M12 3v8" />
          <path d="m8 19-2 3" />
          <path d="m18 22-2-3" />
          <path d="M8 15h0" />
          <path d="M16 15h0" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTramFront
