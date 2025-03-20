import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMilestone = React.forwardRef(function SvgFeatherMilestone(
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
          <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
          <path d="M12 13v8" />
          <path d="M12 3v3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMilestone
