import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherBike = React.forwardRef(function SvgFeatherBike(
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
          <circle cx={18.5} cy={17.5} r={3.5} />
          <circle cx={5.5} cy={17.5} r={3.5} />
          <circle cx={15} cy={5} r={1} />
          <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherBike
