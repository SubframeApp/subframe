import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSaudiRiyal = React.forwardRef(function SvgFeatherSaudiRiyal(
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
          <path d="m20 19.5-5.5 1.2" />
          <path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" />
          <path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" />
          <path d="M20 10 4 13.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSaudiRiyal
