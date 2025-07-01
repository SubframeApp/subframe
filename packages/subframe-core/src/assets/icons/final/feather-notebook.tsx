import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherNotebook = React.forwardRef(function SvgFeatherNotebook(
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
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <rect width={16} height={20} x={4} y={2} rx={2} />
          <path d="M16 2v20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherNotebook
