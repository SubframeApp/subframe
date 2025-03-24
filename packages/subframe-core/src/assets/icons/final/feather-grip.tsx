import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGrip = React.forwardRef(function SvgFeatherGrip(
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
          <circle cx={12} cy={5} r={1} />
          <circle cx={19} cy={5} r={1} />
          <circle cx={5} cy={5} r={1} />
          <circle cx={12} cy={12} r={1} />
          <circle cx={19} cy={12} r={1} />
          <circle cx={5} cy={12} r={1} />
          <circle cx={12} cy={19} r={1} />
          <circle cx={19} cy={19} r={1} />
          <circle cx={5} cy={19} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGrip
