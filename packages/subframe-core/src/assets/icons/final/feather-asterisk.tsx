import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherAsterisk = React.forwardRef(function SvgFeatherAsterisk(
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
          <path d="M12 6v12" />
          <path d="M17.196 9 6.804 15" />
          <path d="m6.804 9 10.392 6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherAsterisk
