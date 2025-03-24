import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTorus = React.forwardRef(function SvgFeatherTorus(
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
          <ellipse cx={12} cy={11} rx={3} ry={2} />
          <ellipse cx={12} cy={12.5} rx={10} ry={8.5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTorus
