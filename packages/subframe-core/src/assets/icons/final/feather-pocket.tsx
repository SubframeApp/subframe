import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPocket = React.forwardRef(function SvgFeatherPocket(
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
          <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" />
          <polyline points="8 10 12 14 16 10" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPocket
