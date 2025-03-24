import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDatabaseZap = React.forwardRef(function SvgFeatherDatabaseZap(
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
          <ellipse cx={12} cy={5} rx={9} ry={3} />
          <path d="M3 5V19A9 3 0 0 0 15 21.84" />
          <path d="M21 5V8" />
          <path d="M21 12L18 17H22L19 22" />
          <path d="M3 12A9 3 0 0 0 14.59 14.87" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDatabaseZap
