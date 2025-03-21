import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShrub = React.forwardRef(function SvgFeatherShrub(
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
          <path d="M12 22v-7l-2-2" />
          <path d="M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z" />
          <path d="m14 14-2 2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShrub
