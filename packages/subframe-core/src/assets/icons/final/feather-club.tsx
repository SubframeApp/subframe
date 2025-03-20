import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherClub = React.forwardRef(function SvgFeatherClub(
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
          <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
          <path d="M12 17.66L12 22" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherClub
