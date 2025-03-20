import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLibrarySquare = React.forwardRef(function SvgFeatherLibrarySquare(
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
          <rect width={18} height={18} x={3} y={3} rx={2} />
          <path d="M7 7v10" />
          <path d="M11 7v10" />
          <path d="m15 7 2 10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLibrarySquare
