import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherColumns3Cog = React.forwardRef(function SvgFeatherColumns3Cog(
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
          <path d="M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5" />
          <path d="m14.3 19.6 1-.4" />
          <path d="M15 3v7.5" />
          <path d="m15.2 16.9-.9-.3" />
          <path d="m16.6 21.7.3-.9" />
          <path d="m16.8 15.3-.4-1" />
          <path d="m19.1 15.2.3-.9" />
          <path d="m19.6 21.7-.4-1" />
          <path d="m20.7 16.8 1-.4" />
          <path d="m21.7 19.4-.9-.3" />
          <path d="M9 3v18" />
          <circle cx={18} cy={18} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherColumns3Cog
