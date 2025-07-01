import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherClipboardMinus = React.forwardRef(function SvgFeatherClipboardMinus(
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
          <rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M9 14h6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherClipboardMinus
