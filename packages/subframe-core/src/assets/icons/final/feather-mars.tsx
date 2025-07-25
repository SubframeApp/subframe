import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMars = React.forwardRef(function SvgFeatherMars(
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
          <path d="M16 3h5v5" />
          <path d="m21 3-6.75 6.75" />
          <circle cx={10} cy={14} r={6} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMars
