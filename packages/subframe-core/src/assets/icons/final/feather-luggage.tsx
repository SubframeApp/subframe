import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLuggage = React.forwardRef(function SvgFeatherLuggage(
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
          <path d="M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0" />
          <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
          <path d="M10 20h4" />
          <circle cx={16} cy={20} r={2} />
          <circle cx={8} cy={20} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLuggage
