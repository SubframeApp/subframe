import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFishSymbol = React.forwardRef(function SvgFeatherFishSymbol(
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
          <path d="M2 16s9-15 20-4C11 23 2 8 2 8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFishSymbol
