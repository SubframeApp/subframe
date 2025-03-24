import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSettings2 = React.forwardRef(function SvgFeatherSettings2(
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
          <path d="M20 7h-9" />
          <path d="M14 17H5" />
          <circle cx={17} cy={17} r={3} />
          <circle cx={7} cy={7} r={3} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSettings2
