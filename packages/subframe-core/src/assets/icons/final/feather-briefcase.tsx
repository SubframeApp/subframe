import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBriefcase = React.forwardRef(function SvgFeatherBriefcase(
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
          <rect width={20} height={14} x={2} y={7} rx={2} ry={2} />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBriefcase
