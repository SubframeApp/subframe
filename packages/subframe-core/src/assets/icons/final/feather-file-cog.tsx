import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileCog = React.forwardRef(function SvgFeatherFileCog(
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
          <circle cx={6} cy={13} r={3} />
          <path d="m9.7 14.4-.9-.3" />
          <path d="m3.2 11.9-.9-.3" />
          <path d="m4.6 16.7.3-.9" />
          <path d="m7.6 16.7-.4-1" />
          <path d="m4.8 10.3-.4-1" />
          <path d="m2.3 14.6 1-.4" />
          <path d="m8.7 11.8 1-.4" />
          <path d="m7.4 9.3-.3.9" />
          <path d="M14 2v6h6" />
          <path d="M4 5.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-1.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileCog
