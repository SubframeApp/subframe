import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherEye = React.forwardRef(function SvgFeatherEye(
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
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx={12} cy={12} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherEye
