export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#f9f9f9] px-6 pt-16 pb-40 min-h-[100vh]">
      <div className="flex w-full max-w-[720px] flex-col items-center gap-8">
        <svg
          className="h-8 w-8 flex-none"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Subframe"
        >
          <path
            d="M285.883 348.942L43.8846 182.232C25.3087 169.435 -1.34337e-06 182.733 -2.32937e-06 205.29L-9.61651e-06 372C-1.02925e-05 387.464 12.536 400 28 400L269.999 400C297.482 400 308.516 364.533 285.883 348.942Z"
            fill="#27272A"
          />
          <ellipse cx="328" cy="230" rx="72" ry="72" transform="rotate(90 328 230)" fill="#27272A" />
          <rect x="400" width="128" height="400" rx="28" transform="rotate(90 400 0)" fill="#27272A" />
        </svg>
        <div className="flex w-full flex-col items-center gap-5">
          <span className="w-full font-['Inter'] text-[46px] font-[500] leading-[50px] tracking-[-0.03em] text-[#000000f5] text-center">
            Welcome to Subframe
          </span>
          <span className="w-full max-w-[520px] font-['Inter'] text-[18px] font-[400] leading-[28px] tracking-[-0.01em] text-[#0000008c] text-center">
            Use the desktop app to work with your local codebase, development server, and coding agent.
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <a
            href="https://subframe.com/downloads"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-[14px] bg-[#0000000f] px-5 cursor-pointer hover:bg-[rgba(0,0,0,0.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000000f5]"
          >
            <span className="whitespace-nowrap font-['Inter'] text-[15px] font-[500] leading-[20px] tracking-[-0.01em] text-[#000000f5]">
              Download for macOS
            </span>
          </a>
          <a
            href="https://docs.subframe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center rounded-[14px] px-5 cursor-pointer hover:bg-[rgba(0,0,0,0.04)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000000f5]"
          >
            <span className="whitespace-nowrap font-['Inter'] text-[15px] font-[500] leading-[20px] tracking-[-0.01em] text-[#0000008c]">
              Read the docs
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
