import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserCog2 = React.forwardRef(function SvgFeatherUserCog2(
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
          <circle cx={18} cy={15} r={3} />
          <circle cx={8} cy={9} r={4} />
          <path d="M10.5 13.5A6 6 0 0 0 2 19" />
          <path d="m21.7 16.4-.9-.3" />
          <path d="m15.2 13.9-.9-.3" />
          <path d="m16.6 18.7.3-.9" />
          <path d="m19.1 12.2.3-.9" />
          <path d="m19.6 18.7-.4-1" />
          <path d="m16.8 12.3-.4-1" />
          <path d="m14.3 16.6 1-.4" />
          <path d="m20.7 13.8 1-.4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserCog2
