import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherGlasses = React.forwardRef(function SvgFeatherGlasses(
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
          <circle cx={6} cy={15} r={4} />
          <circle cx={18} cy={15} r={4} />
          <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
          <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" />
          <path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherGlasses
