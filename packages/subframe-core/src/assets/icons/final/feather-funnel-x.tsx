import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFunnelX = React.forwardRef(function SvgFeatherFunnelX(
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
          <path d="M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473" />
          <path d="m16.5 3.5 5 5" />
          <path d="m21.5 3.5-5 5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFunnelX
