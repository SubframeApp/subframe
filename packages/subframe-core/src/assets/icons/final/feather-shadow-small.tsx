import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShadowSmall = React.forwardRef(function SvgFeatherShadowSmall(
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
          <path d="M10 2H14C17.866 2 21 5.13401 21 9C21 12.866 17.866 16 14 16H10C6.13401 16 3 12.866 3 9C3 5.13401 6.13401 2 10 2Z" />
          <path d="M8.73132 20.9203L10.379 21M13.6209 21L15.2809 20.9203" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShadowSmall
