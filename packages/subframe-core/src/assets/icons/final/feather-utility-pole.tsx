import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUtilityPole = React.forwardRef(function SvgFeatherUtilityPole(
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
          <path d="M12 2v20" />
          <path d="M2 5h20" />
          <path d="M3 3v2" />
          <path d="M7 3v2" />
          <path d="M17 3v2" />
          <path d="M21 3v2" />
          <path d="m19 5-7 7-7-7" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUtilityPole
