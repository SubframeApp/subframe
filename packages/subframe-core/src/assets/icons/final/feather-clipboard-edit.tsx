import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherClipboardEdit = React.forwardRef(function SvgFeatherClipboardEdit(
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
          <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
          <path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherClipboardEdit
