import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherDoorClosedLocked = React.forwardRef(function SvgFeatherDoorClosedLocked(
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
          <path d="M10 12h.01" />
          <path d="M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
          <path d="M2 20h8" />
          <path d="M20 17v-2a2 2 0 1 0-4 0v2" />
          <rect x={14} y={17} width={8} height={5} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherDoorClosedLocked
