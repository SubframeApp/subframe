import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherVegan = React.forwardRef(function SvgFeatherVegan(
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
          <path d="M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14" />
          <path d="M16 8c4 0 6-2 6-6-4 0-6 2-6 6" />
          <path d="M17.41 3.6a10 10 0 1 0 3 3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherVegan
