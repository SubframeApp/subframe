import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFolderCog2 = React.forwardRef(function SvgFeatherFolderCog2(
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
          <circle cx={12} cy={13} r={2} />
          <path d="M12 10v1" />
          <path d="M12 15v1" />
          <path d="m14.6 11.5-.87.5" />
          <path d="m10.27 14-.87.5" />
          <path d="m14.6 14.5-.87-.5" />
          <path d="m10.27 12-.87-.5" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFolderCog2
