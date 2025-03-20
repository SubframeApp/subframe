import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherRss = React.forwardRef(function SvgFeatherRss(
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
          <path d="M4 11a9 9 0 0 1 9 9" />
          <path d="M4 4a16 16 0 0 1 16 16" />
          <circle cx={5} cy={19} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherRss
