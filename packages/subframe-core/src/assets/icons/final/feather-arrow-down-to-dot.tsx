import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArrowDownToDot = React.forwardRef(function SvgFeatherArrowDownToDot(
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
          <path d="M12 2v14" />
          <path d="m19 9-7 7-7-7" />
          <circle cx={12} cy={21} r={1} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArrowDownToDot
