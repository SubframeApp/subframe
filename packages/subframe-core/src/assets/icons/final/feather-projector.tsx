import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherProjector = React.forwardRef(function SvgFeatherProjector(
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
          <path d="M5 7 3 5" />
          <path d="M9 6V3" />
          <path d="m13 7 2-2" />
          <circle cx={9} cy={13} r={3} />
          <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
          <path d="M16 16h2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherProjector
