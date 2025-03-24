import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherToyBrick = React.forwardRef(function SvgFeatherToyBrick(
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
          <rect width={18} height={12} x={3} y={8} rx={1} />
          <path d="M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" />
          <path d="M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherToyBrick
