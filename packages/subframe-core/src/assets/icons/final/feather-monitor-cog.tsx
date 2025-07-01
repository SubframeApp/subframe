import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMonitorCog = React.forwardRef(function SvgFeatherMonitorCog(
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
          <path d="M12 17v4" />
          <path d="m14.305 7.53.923-.382" />
          <path d="m15.228 4.852-.923-.383" />
          <path d="m16.852 3.228-.383-.924" />
          <path d="m16.852 8.772-.383.923" />
          <path d="m19.148 3.228.383-.924" />
          <path d="m19.53 9.696-.382-.924" />
          <path d="m20.772 4.852.924-.383" />
          <path d="m20.772 7.148.924.383" />
          <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
          <path d="M8 21h8" />
          <circle cx={18} cy={6} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMonitorCog
