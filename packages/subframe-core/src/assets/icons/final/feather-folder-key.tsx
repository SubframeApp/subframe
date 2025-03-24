import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFolderKey = React.forwardRef(function SvgFeatherFolderKey(
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
          <circle cx={16} cy={20} r={2} />
          <path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2" />
          <path d="m22 14-4.5 4.5" />
          <path d="m21 15 1 1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFolderKey
