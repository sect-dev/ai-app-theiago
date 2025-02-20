import React from 'react';

const ChatHeaderSkeleton = () => {
  return (
    <div className="h-[78px] px-[24px] py-[16px] bg-[#121423] rounded-[8px] flex justify-between items-center">
      <div className="flex items-center gap-[12px]">
        <span className="animate-pulse relative block overflow-hidden rounded-[16px] size-[42px] bg-[#1F2237]" />
        <div className="text-left">
          <p className="animate-pulse font-medium bg-[#1F2237] w-[81px] h-[16px] rounded-[9px] mb-[4px]"/>
          <p className="flex items-center gap-[4px] font-medium max-w-[125px] ">
            <span className="block rounded-full bg-[#4DCF9F] size-[4px] " />
            <span className="text-[12px] opacity-50 line-clamp-1 tracking-[-0.04em]">Online</span>
          </p>
        </div>
      </div>
      <div className="animate-pulse block bg-main-gradient h-[24px] w-[72px] flex items-center rounded-[15px] " />
    </div>
  );
};

export default ChatHeaderSkeleton;