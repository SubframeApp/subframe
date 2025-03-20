import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherContact = React.forwardRef(function SvgFeatherContact(
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
          <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
          <rect width={18} height={18} x={3} y={4} rx={2} />
          <circle cx={12} cy={10} r={2} />
          <line x1={8} x2={8} y1={2} y2={4} />
          <line x1={16} x2={16} y1={2} y2={4} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherContact
