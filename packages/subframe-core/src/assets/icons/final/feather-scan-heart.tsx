import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherScanHeart = React.forwardRef(function SvgFeatherScanHeart(
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
          <path d="M11.246 16.657a1 1 0 0 0 1.508 0l3.57-4.101A2.75 2.75 0 1 0 12 9.168a2.75 2.75 0 1 0-4.324 3.388z" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherScanHeart
