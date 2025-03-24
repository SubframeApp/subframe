import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBookmarkCheck = React.forwardRef(function SvgFeatherBookmarkCheck(
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
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
          <path d="m9 10 2 2 4-4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBookmarkCheck
