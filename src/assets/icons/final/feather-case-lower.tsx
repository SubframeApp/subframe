import * as React from "react"
import { SVGProps } from "react"
const SvgFeatherCaseLower = (props: SVGProps<SVGSVGElement>) => (
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
    {...props}
  >
    <circle cx={7} cy={12} r={3} />
    <path d="M10 9v6" />
    <circle cx={17} cy={12} r={3} />
    <path d="M14 7v8" />
  </svg>
)
export default SvgFeatherCaseLower
