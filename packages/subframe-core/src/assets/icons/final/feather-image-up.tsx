import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherImageUp = React.forwardRef(function SvgFeatherImageUp(
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
          <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
          <path d="m14 19.5 3-3 3 3" />
          <path d="M17 22v-5.5" />
          <circle cx={9} cy={9} r={2} />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherImageUp
