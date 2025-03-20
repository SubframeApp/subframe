import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMartini = React.forwardRef(function SvgFeatherMartini(
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
          <path d="M8 22h8" />
          <path d="M12 11v11" />
          <path d="m19 3-7 8-7-8Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMartini
