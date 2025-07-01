import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBetweenVerticalStart = React.forwardRef(function SvgFeatherBetweenVerticalStart(
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
          <rect width={7} height={13} x={3} y={8} rx={1} />
          <path d="m15 2-3 3-3-3" />
          <rect width={7} height={13} x={14} y={8} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBetweenVerticalStart
