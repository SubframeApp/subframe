import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBlend = React.forwardRef(function SvgFeatherBlend(
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
          <circle cx={9} cy={9} r={7} />
          <circle cx={15} cy={15} r={7} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBlend
