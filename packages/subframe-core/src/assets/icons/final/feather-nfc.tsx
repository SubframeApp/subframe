import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherNfc = React.forwardRef(function SvgFeatherNfc(
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
          <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
          <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
          <path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" />
          <path d="M16.37 2a20.16 20.16 0 0 1 0 20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherNfc
