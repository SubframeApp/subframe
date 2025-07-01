import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVenusAndMars = React.forwardRef(function SvgFeatherVenusAndMars(
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
          <path d="M10 20h4" />
          <path d="M12 16v6" />
          <path d="M17 2h4v4" />
          <path d="m21 2-5.46 5.46" />
          <circle cx={12} cy={11} r={5} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVenusAndMars
