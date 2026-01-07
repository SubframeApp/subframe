export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-[#f5f5f5ff] px-12 py-12">
      <div className="flex w-full max-w-[448px] flex-col items-start gap-8">
        <img
          className="w-12 flex-none"
          src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
        />
        <div className="flex max-w-[384px] flex-col items-start gap-2">
          <div className="flex items-start gap-2">
            <span className="font-['Inter'] text-[32px] font-[400] leading-[36px] tracking-tighter text-[#242424ff]">
              Welcome to Subframe
            </span>
            <div className="flex h-6 items-center gap-1 rounded-full px-2 bg-gradient-to-b from-[#5C5C5C] to-[#242424]">
              <span className="font-['Inter'] text-[12px] font-[500] leading-[16px] text-white">Vite</span>
            </div>
          </div>
          <span className="whitespace-pre-wrap font-['Inter'] text-[16px] font-[400] leading-[24px] text-[#737373ff]">
            {"Start building your app by syncing components & exporting code from Subframe."}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <a
            href="https://app.subframe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 rounded-[6px] bg-[#171717ff] px-3 py-2"
          >
            <span className="whitespace-nowrap font-['Inter'] text-[14px] font-[500] leading-[20px] tracking-tight text-white">
              Open Subframe
            </span>
          </a>
          <a
            href="https://docs.subframe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 rounded-[6px] bg-[#e6e6e6ff] px-3 py-2"
          >
            <span className="whitespace-nowrap font-['Inter'] text-[14px] font-[500] leading-[20px] tracking-tight text-[#171717ff]">
              View documentation
            </span>
          </a>
          <a
            href="https://docs.subframe.com/guides/mcp-server"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 rounded-[6px] bg-[#e6e6e6ff] px-3 py-2"
          >
            <span className="whitespace-nowrap font-['Inter'] text-[14px] font-[500] leading-[20px] tracking-tight text-[#171717ff]">
              Install MCP
            </span>
          </a>
        </div>
        <span className="whitespace-pre-wrap font-['Inter'] text-[12px] font-[400] leading-[16px] text-[#737373ff]">
          {"Hint: replace this page with code copied from Subframe to see your design."}
        </span>
      </div>
    </div>
  )
}
