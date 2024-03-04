import * as React from "react"
import { SVGProps } from "react"
const SvgFeatherGitPullRequestArrow = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={5} cy={6} r={3} />
    <path d="M5 9v12" />
    <circle cx={19} cy={18} r={3} />
    <path d="m15 9-3-3 3-3" />
    <path d="M12 6h5a2 2 0 0 1 2 2v7" />
  </svg>
)
export default SvgFeatherGitPullRequestArrow
