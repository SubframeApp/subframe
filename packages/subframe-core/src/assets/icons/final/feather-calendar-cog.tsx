import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherCalendarCog = React.forwardRef(function SvgFeatherCalendarCog(
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
          <path d="m15.228 16.852-.923-.383" />
          <path d="m15.228 19.148-.923.383" />
          <path d="M16 2v4" />
          <path d="m16.47 14.305.382.923" />
          <path d="m16.852 20.772-.383.924" />
          <path d="m19.148 15.228.383-.923" />
          <path d="m19.53 21.696-.382-.924" />
          <path d="m20.772 16.852.924-.383" />
          <path d="m20.772 19.148.924.383" />
          <path d="M21 11V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
          <circle cx={18} cy={18} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherCalendarCog
