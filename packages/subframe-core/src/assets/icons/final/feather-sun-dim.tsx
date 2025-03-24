import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSunDim = React.forwardRef(function SvgFeatherSunDim(
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
          <circle cx={12} cy={12} r={4} />
          <path d="M12 4h.01" />
          <path d="M20 12h.01" />
          <path d="M12 20h.01" />
          <path d="M4 12h.01" />
          <path d="M17.657 6.343h.01" />
          <path d="M17.657 17.657h.01" />
          <path d="M6.343 17.657h.01" />
          <path d="M6.343 6.343h.01" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSunDim
