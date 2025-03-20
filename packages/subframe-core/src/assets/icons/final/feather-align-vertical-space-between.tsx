import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAlignVerticalSpaceBetween = React.forwardRef(function SvgFeatherAlignVerticalSpaceBetween(
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
          <rect width={14} height={6} x={5} y={15} rx={2} />
          <rect width={10} height={6} x={7} y={3} rx={2} />
          <path d="M2 21h20" />
          <path d="M2 3h20" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAlignVerticalSpaceBetween
