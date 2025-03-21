import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherImageDown = React.forwardRef(function SvgFeatherImageDown(
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
          <circle cx={9} cy={9} r={2} />
          <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10.8" />
          <path d="m21 15-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
          <path d="m14 19.5 3 3v-6" />
          <path d="m17 22.5 3-3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherImageDown
