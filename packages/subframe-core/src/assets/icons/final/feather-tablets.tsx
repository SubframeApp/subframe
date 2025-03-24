import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherTablets = React.forwardRef(function SvgFeatherTablets(
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
          <circle cx={7} cy={7} r={5} />
          <circle cx={17} cy={17} r={5} />
          <path d="M12 17h10" />
          <path d="m3.46 10.54 7.08-7.08" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherTablets
