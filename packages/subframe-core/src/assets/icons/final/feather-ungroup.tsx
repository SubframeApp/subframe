import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUngroup = React.forwardRef(function SvgFeatherUngroup(
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
          <rect width={8} height={6} x={5} y={4} rx={1} />
          <rect width={8} height={6} x={11} y={14} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUngroup
