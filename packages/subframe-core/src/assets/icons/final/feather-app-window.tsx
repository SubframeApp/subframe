import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAppWindow = React.forwardRef(function SvgFeatherAppWindow(
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
          <rect x={2} y={4} width={20} height={16} rx={2} />
          <path d="M10 4v4" />
          <path d="M2 8h20" />
          <path d="M6 4v4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAppWindow
