import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherNotepadText = React.forwardRef(function SvgFeatherNotepadText(
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
          <path d="M8 2v4" />
          <path d="M12 2v4" />
          <path d="M16 2v4" />
          <rect width={16} height={18} x={4} y={4} rx={2} />
          <path d="M8 10h6" />
          <path d="M8 14h8" />
          <path d="M8 18h5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherNotepadText
