import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherForklift = React.forwardRef(function SvgFeatherForklift(
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
          <path d="M12 12H5a2 2 0 0 0-2 2v5" />
          <circle cx={13} cy={19} r={2} />
          <circle cx={5} cy={19} r={2} />
          <path d="M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherForklift
