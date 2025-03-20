import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherArchiveRestore = React.forwardRef(function SvgFeatherArchiveRestore(
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
          <rect width={20} height={5} x={2} y={3} rx={1} />
          <path d="M4 8v11a2 2 0 0 0 2 2h2" />
          <path d="M20 8v11a2 2 0 0 1-2 2h-2" />
          <path d="m9 15 3-3 3 3" />
          <path d="M12 12v9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherArchiveRestore
