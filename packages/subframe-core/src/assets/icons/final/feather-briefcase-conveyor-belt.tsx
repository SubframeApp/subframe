import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBriefcaseConveyorBelt = React.forwardRef(function SvgFeatherBriefcaseConveyorBelt(
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
          <path d="M10 20v2" />
          <path d="M14 20v2" />
          <path d="M18 20v2" />
          <path d="M21 20H3" />
          <path d="M6 20v2" />
          <path d="M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" />
          <rect x={4} y={6} width={16} height={10} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBriefcaseConveyorBelt
