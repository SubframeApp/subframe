import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDelete = React.forwardRef(function SvgFeatherDelete(
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
          <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
          <line x1={18} x2={12} y1={9} y2={15} />
          <line x1={12} x2={18} y1={9} y2={15} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDelete
