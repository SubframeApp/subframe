import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFolderKanban = React.forwardRef(function SvgFeatherFolderKanban(
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
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
          <path d="M8 10v4" />
          <path d="M12 10v2" />
          <path d="M16 10v6" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFolderKanban
