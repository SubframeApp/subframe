import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListCollapse = React.forwardRef(function SvgFeatherListCollapse(
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
          <path d="M10 12h11" />
          <path d="M10 18h11" />
          <path d="M10 6h11" />
          <path d="m3 10 3-3-3-3" />
          <path d="m3 20 3-3-3-3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListCollapse
