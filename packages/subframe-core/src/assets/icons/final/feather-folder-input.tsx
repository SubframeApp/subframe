import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFolderInput = React.forwardRef(function SvgFeatherFolderInput(
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
          <path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
          <path d="M2 13h10" />
          <path d="m9 16 3-3-3-3" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFolderInput
