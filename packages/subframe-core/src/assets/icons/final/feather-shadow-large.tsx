import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherShadowLarge = React.forwardRef(function SvgFeatherShadowLarge(
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
          <path d="M10 2H14C17.866 2 21 5.13401 21 9C21 12.866 17.866 16 14 16H10C6.13401 16 3 12.866 3 9C3 5.13401 6.13401 2 10 2Z" />
          <path d="M11.158 21H12.8319M16.1663 20.7036C16.1663 20.7036 16.6649 20.6152 16.9819 20.5463C17.298 20.4776 17.7869 20.3514 17.7869 20.3514M7.83373 20.7036C7.83373 20.7036 7.33508 20.6152 7.01809 20.5463C6.70203 20.4776 6.21313 20.3514 6.21313 20.3514M20.8668 19.039C20.8668 19.039 21.0922 18.88 21.2412 18.7498C21.3901 18.6195 21.56 18.4452 21.56 18.4452M3.13314 19.0391C3.13314 19.0391 2.90774 18.8801 2.7588 18.7498C2.60985 18.6195 2.43994 18.4452 2.43994 18.4452" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherShadowLarge
