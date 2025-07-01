import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLaptopMinimalCheck = React.forwardRef(function SvgFeatherLaptopMinimalCheck(
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
          <path d="M2 20h20" />
          <path d="m9 10 2 2 4-4" />
          <rect x={3} y={4} width={18} height={12} rx={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLaptopMinimalCheck
