import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMousePointerBan = React.forwardRef(function SvgFeatherMousePointerBan(
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
          <path d="M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z" />
          <circle cx={16} cy={16} r={6} />
          <path d="m11.8 11.8 8.4 8.4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMousePointerBan
