import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserX2 = React.forwardRef(function SvgFeatherUserX2(
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
          <path d="M14 19a6 6 0 0 0-12 0" />
          <circle cx={8} cy={9} r={4} />
          <line x1={17} x2={22} y1={8} y2={13} />
          <line x1={22} x2={17} y1={8} y2={13} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserX2
