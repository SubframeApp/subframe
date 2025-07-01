import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBetweenHorizontalEnd = React.forwardRef(function SvgFeatherBetweenHorizontalEnd(
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
          <rect width={13} height={7} x={3} y={3} rx={1} />
          <path d="m22 15-3-3 3-3" />
          <rect width={13} height={7} x={3} y={14} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBetweenHorizontalEnd
