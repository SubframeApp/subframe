import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherOrbit = React.forwardRef(function SvgFeatherOrbit(
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
          <circle cx={12} cy={12} r={3} />
          <circle cx={19} cy={5} r={2} />
          <circle cx={5} cy={19} r={2} />
          <path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" />
          <path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherOrbit
