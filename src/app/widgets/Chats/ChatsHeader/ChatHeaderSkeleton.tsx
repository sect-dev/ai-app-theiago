import React from "react";

const ChatHeaderSkeleton = () => {
  return (
    <div className="flex h-[78px] items-center justify-between rounded-[8px] bg-[#121423] px-[24px] py-[16px]">
      <div className="flex items-center gap-[12px]">
        <span className="relative block size-[42px] animate-pulse overflow-hidden rounded-[16px] bg-[#1F2237]" />
        <div className="text-left">
          <p className="mb-[4px] h-[16px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium" />
          <p className="flex max-w-[125px] items-center gap-[4px] font-medium">
            <span className="block size-[4px] rounded-full bg-[#4DCF9F]" />
            <span className="line-clamp-1 text-[12px] tracking-[-0.04em] opacity-50">
              Online
            </span>
          </p>
        </div>
      </div>
      <div className="main-gradient block flex h-[24px] w-[72px] animate-pulse items-center rounded-[15px]" />
    </div>
  );
};

export default ChatHeaderSkeleton;
