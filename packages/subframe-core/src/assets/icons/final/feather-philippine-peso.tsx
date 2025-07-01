import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherPhilippinePeso = React.forwardRef(function SvgFeatherPhilippinePeso(
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
          <path d="M20 11H4" />
          <path d="M20 7H4" />
          <path d="M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherPhilippinePeso
