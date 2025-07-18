import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVenus = React.forwardRef(function SvgFeatherVenus(
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
          <path d="M12 15v7" />
          <path d="M9 19h6" />
          <circle cx={12} cy={9} r={6} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVenus
