import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileMusic = React.forwardRef(function SvgFeatherFileMusic(
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
          <path d="M10.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v8.4" />
          <path d="M8 18v-7.7L16 9v7" />
          <circle cx={14} cy={16} r={2} />
          <circle cx={6} cy={18} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileMusic
