import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileAudio2 = React.forwardRef(function SvgFeatherFileAudio2(
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
          <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v2" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M2 17v-3a4 4 0 0 1 8 0v3" />
          <circle cx={9} cy={17} r={1} />
          <circle cx={3} cy={17} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileAudio2
