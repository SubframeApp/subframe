import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherUmbrella = React.forwardRef(function SvgFeatherUmbrella(
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
          <path d="M22 12a10.06 10.06 1 0 0-20 0Z" />
          <path d="M12 12v8a2 2 0 0 0 4 0" />
          <path d="M12 2v1" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherUmbrella
