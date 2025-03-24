import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSlice = React.forwardRef(function SvgFeatherSlice(
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
          <path d="m8 14-6 6h9v-3" />
          <path d="M18.37 3.63 8 14l3 3L21.37 6.63a2.12 2.12 0 1 0-3-3Z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSlice
