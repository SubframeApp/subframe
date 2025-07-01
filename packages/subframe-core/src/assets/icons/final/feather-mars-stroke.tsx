import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMarsStroke = React.forwardRef(function SvgFeatherMarsStroke(
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
          <path d="m14 6 4 4" />
          <path d="M17 3h4v4" />
          <path d="m21 3-7.75 7.75" />
          <circle cx={9} cy={15} r={6} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMarsStroke
