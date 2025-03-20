import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherLineHeight = React.forwardRef(function SvgFeatherLineHeight(
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
          <path d="M3 22L21 22M3 2L21 2" />
          <path d="M7 18.2918L8.53691 14.1763M8.53691 14.1763L11.5918 5.99592C11.5918 5.99592 11.6429 5.70818 12.0096 5.70818C12.3764 5.70818 12.4337 5.9959 12.4337 5.9959L15.4716 14.1763M8.53691 14.1763H15.4716M15.4716 14.1763L17 18.2918" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherLineHeight
