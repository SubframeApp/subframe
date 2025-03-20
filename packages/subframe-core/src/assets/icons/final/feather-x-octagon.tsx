import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherXOctagon = React.forwardRef(function SvgFeatherXOctagon(
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
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherXOctagon
