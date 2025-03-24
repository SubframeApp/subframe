import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherConciergeBell = React.forwardRef(function SvgFeatherConciergeBell(
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
          <path d="M2 18a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2v-2Z" />
          <path d="M20 16a8 8 0 1 0-16 0" />
          <path d="M12 4v4" />
          <path d="M10 4h4" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherConciergeBell
