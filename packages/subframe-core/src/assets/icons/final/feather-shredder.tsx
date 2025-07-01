import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShredder = React.forwardRef(function SvgFeatherShredder(
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
          <path d="M10 22v-5" />
          <path d="M14 19v-2" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M18 20v-3" />
          <path d="M2 13h20" />
          <path d="M20 13V7l-5-5H6a2 2 0 0 0-2 2v9" />
          <path d="M6 20v-3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShredder
