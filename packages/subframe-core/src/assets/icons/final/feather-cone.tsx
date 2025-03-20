import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCone = React.forwardRef(function SvgFeatherCone(
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
          <path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" />
          <ellipse cx={12} cy={19} rx={9} ry={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCone
