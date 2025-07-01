import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFunnelPlus = React.forwardRef(function SvgFeatherFunnelPlus(
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
          <path d="M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348" />
          <path d="M16 6h6" />
          <path d="M19 3v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFunnelPlus
