import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileCog2 = React.forwardRef(function SvgFeatherFileCog2(
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
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <circle cx={12} cy={15} r={2} />
          <path d="M12 12v1" />
          <path d="M12 17v1" />
          <path d="m14.6 13.5-.87.5" />
          <path d="m10.27 16-.87.5" />
          <path d="m14.6 16.5-.87-.5" />
          <path d="m10.27 14-.87-.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileCog2
