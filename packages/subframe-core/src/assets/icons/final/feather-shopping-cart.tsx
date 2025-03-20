import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShoppingCart = React.forwardRef(function SvgFeatherShoppingCart(
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
          <circle cx={8} cy={21} r={1} />
          <circle cx={19} cy={21} r={1} />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShoppingCart
