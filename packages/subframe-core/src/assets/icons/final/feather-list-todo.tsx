import * as React from "react"
import { IconWrapper } from "../../../components/icon-wrapper"
const SvgFeatherListTodo = React.forwardRef(function SvgFeatherListTodo(
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
          <rect x={3} y={5} width={6} height={6} rx={1} />
          <path d="m3 17 2 2 4-4" />
          <path d="M13 6h8" />
          <path d="M13 12h8" />
          <path d="M13 18h8" />
        </svg>
      }
    </IconWrapper>
  )
})
export default SvgFeatherListTodo
