import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherImageUpscale = React.forwardRef(function SvgFeatherImageUpscale(
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
          <path d="M16 3h5v5" />
          <path d="M17 21h2a2 2 0 0 0 2-2" />
          <path d="M21 12v3" />
          <path d="m21 3-5 5" />
          <path d="M3 7V5a2 2 0 0 1 2-2" />
          <path d="m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19" />
          <path d="M9 3h3" />
          <rect x={3} y={11} width={10} height={10} rx={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherImageUpscale
