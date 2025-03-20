import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherMerge = React.forwardRef(function SvgFeatherMerge(
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
          <path d="m8 6 4-4 4 4" />
          <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
          <path d="m20 22-5-5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherMerge
