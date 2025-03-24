import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBookAudio = React.forwardRef(function SvgFeatherBookAudio(
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M8 8v3" />
          <path d="M12 6v7" />
          <path d="M16 8v3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBookAudio
