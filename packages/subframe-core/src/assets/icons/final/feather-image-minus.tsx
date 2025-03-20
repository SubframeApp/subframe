import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherImageMinus = React.forwardRef(function SvgFeatherImageMinus(
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
          <path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
          <line x1={16} x2={22} y1={5} y2={5} />
          <circle cx={9} cy={9} r={2} />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherImageMinus
