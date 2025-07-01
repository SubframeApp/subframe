import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUserSearch = React.forwardRef(function SvgFeatherUserSearch(
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
          <circle cx={10} cy={7} r={4} />
          <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
          <circle cx={17} cy={17} r={3} />
          <path d="m21 21-1.9-1.9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUserSearch
