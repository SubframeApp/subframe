import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBriefcaseBusiness = React.forwardRef(function SvgFeatherBriefcaseBusiness(
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
          <path d="M12 12h.01" />
          <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M22 13a18.15 18.15 0 0 1-20 0" />
          <rect width={20} height={14} x={2} y={6} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBriefcaseBusiness
