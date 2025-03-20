import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGroup = React.forwardRef(function SvgFeatherGroup(
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
          <path d="M3 7V5c0-1.1.9-2 2-2h2" />
          <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
          <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
          <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
          <rect width={7} height={5} x={7} y={7} rx={1} />
          <rect width={7} height={5} x={10} y={12} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGroup
