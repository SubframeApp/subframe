import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUnfoldVertical = React.forwardRef(function SvgFeatherUnfoldVertical(
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
          <path d="M12 22v-6" />
          <path d="M12 8V2" />
          <path d="M4 12H2" />
          <path d="M10 12H8" />
          <path d="M16 12h-2" />
          <path d="M22 12h-2" />
          <path d="m15 19-3 3-3-3" />
          <path d="m15 5-3-3-3 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUnfoldVertical
