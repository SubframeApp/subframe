import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShoppingBasket = React.forwardRef(function SvgFeatherShoppingBasket(
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
          <path d="m5 11 4-7" />
          <path d="m19 11-4-7" />
          <path d="M2 11h20" />
          <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
          <path d="m9 11 1 9" />
          <path d="M4.5 15.5h15" />
          <path d="m15 11-1 9" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShoppingBasket
