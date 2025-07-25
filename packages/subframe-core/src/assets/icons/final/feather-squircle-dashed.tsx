import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherSquircleDashed = React.forwardRef(function SvgFeatherSquircleDashed(
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
          <path d="M13.77 3.043a34 34 0 0 0-3.54 0" />
          <path d="M13.771 20.956a33 33 0 0 1-3.541.001" />
          <path d="M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44" />
          <path d="M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438" />
          <path d="M20.957 10.23a33 33 0 0 1 0 3.54" />
          <path d="M3.043 10.23a34 34 0 0 0 .001 3.541" />
          <path d="M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438" />
          <path d="M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherSquircleDashed
