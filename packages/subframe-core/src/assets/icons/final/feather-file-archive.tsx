import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFileArchive = React.forwardRef(function SvgFeatherFileArchive(
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
          <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h8.5L20 7.5V20c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6h-2" />
          <polyline points="14 2 14 8 20 8" />
          <circle cx={10} cy={20} r={2} />
          <path d="M10 7V6" />
          <path d="M10 12v-1" />
          <path d="M10 18v-2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFileArchive
