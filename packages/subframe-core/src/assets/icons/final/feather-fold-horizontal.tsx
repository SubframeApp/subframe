import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFoldHorizontal = React.forwardRef(function SvgFeatherFoldHorizontal(
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
          <path d="M2 12h6" />
          <path d="M22 12h-6" />
          <path d="M12 2v2" />
          <path d="M12 8v2" />
          <path d="M12 14v2" />
          <path d="M12 20v2" />
          <path d="m19 9-3 3 3 3" />
          <path d="m5 15 3-3-3-3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFoldHorizontal
