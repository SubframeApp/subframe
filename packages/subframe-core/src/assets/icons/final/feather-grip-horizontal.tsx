import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGripHorizontal = React.forwardRef(function SvgFeatherGripHorizontal(
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
          <circle cx={12} cy={9} r={1} />
          <circle cx={19} cy={9} r={1} />
          <circle cx={5} cy={9} r={1} />
          <circle cx={12} cy={15} r={1} />
          <circle cx={19} cy={15} r={1} />
          <circle cx={5} cy={15} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGripHorizontal
