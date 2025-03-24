import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherFolderArchive = React.forwardRef(function SvgFeatherFolderArchive(
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
          <circle cx={15} cy={19} r={2} />
          <path d="M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1" />
          <path d="M15 11v-1" />
          <path d="M15 17v-2" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherFolderArchive
