import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMessageSquareDiff = React.forwardRef(function SvgFeatherMessageSquareDiff(
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
          <path d="m5 19-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
          <path d="M9 10h6" />
          <path d="M12 7v6" />
          <path d="M9 17h6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMessageSquareDiff
