import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGpu = React.forwardRef(function SvgFeatherGpu(
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
          <path d="M2 21V3" />
          <path d="M2 5h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2.26" />
          <path d="M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3" />
          <circle cx={16} cy={11} r={2} />
          <circle cx={8} cy={11} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGpu
