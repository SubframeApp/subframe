import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVibrate = React.forwardRef(function SvgFeatherVibrate(
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
          <path d="m2 8 2 2-2 2 2 2-2 2" />
          <path d="m22 8-2 2 2 2-2 2 2 2" />
          <rect width={8} height={14} x={8} y={5} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVibrate
