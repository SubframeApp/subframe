import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBoomBox = React.forwardRef(function SvgFeatherBoomBox(
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
          <path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
          <path d="M8 8v1" />
          <path d="M12 8v1" />
          <path d="M16 8v1" />
          <rect width={20} height={12} x={2} y={9} rx={2} />
          <circle cx={8} cy={15} r={2} />
          <circle cx={16} cy={15} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBoomBox
