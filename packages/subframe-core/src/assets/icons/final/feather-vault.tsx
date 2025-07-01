import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVault = React.forwardRef(function SvgFeatherVault(
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
          <rect width={18} height={18} x={3} y={3} rx={2} />
          <circle cx={7.5} cy={7.5} r={0.5} fill="currentColor" />
          <path d="m7.9 7.9 2.7 2.7" />
          <circle cx={16.5} cy={7.5} r={0.5} fill="currentColor" />
          <path d="m13.4 10.6 2.7-2.7" />
          <circle cx={7.5} cy={16.5} r={0.5} fill="currentColor" />
          <path d="m7.9 16.1 2.7-2.7" />
          <circle cx={16.5} cy={16.5} r={0.5} fill="currentColor" />
          <path d="m13.4 13.4 2.7 2.7" />
          <circle cx={12} cy={12} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVault
