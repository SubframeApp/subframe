import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFolderCode = React.forwardRef(function SvgFeatherFolderCode(
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
          <path d="M10 10.5 8 13l2 2.5" />
          <path d="m14 10.5 2 2.5-2 2.5" />
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFolderCode
