import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherNonBinary = React.forwardRef(function SvgFeatherNonBinary(
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
          <path d="M12 2v10" />
          <path d="m8.5 4 7 4" />
          <path d="m8.5 8 7-4" />
          <circle cx={12} cy={17} r={5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherNonBinary
