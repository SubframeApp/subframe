import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBookUp2 = React.forwardRef(function SvgFeatherBookUp2(
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
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" />
          <path d="M18 2h2v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M12 13V7" />
          <path d="m9 10 3-3 3 3" />
          <path d="m9 5 3-3 3 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBookUp2
