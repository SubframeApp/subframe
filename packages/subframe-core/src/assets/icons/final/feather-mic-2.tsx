import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMic2 = React.forwardRef(function SvgFeatherMic2(
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
          <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
          <circle cx={17} cy={7} r={5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMic2
