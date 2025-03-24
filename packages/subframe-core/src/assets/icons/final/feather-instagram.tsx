import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherInstagram = React.forwardRef(function SvgFeatherInstagram(
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
          <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1={17.5} x2={17.51} y1={6.5} y2={6.5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherInstagram
