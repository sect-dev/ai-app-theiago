import React from "react";

const ChatsListItemSkeleton = () => {
  return (
    <div className="space-y-[14px]">
      <div className={"flex  px-[20px] "}>
        <span className="flex items-center gap-[8px]">
          <div className="relative">
            <div className="animate-pulse relative block overflow-hidden rounded-[16px] size-[42px] bg-[#1F2237]" />
          </div>
          {true && (
            <div className="animate-fadeIn delay-300 space-y-[4px]">
              <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px]" />
              <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px] md:w-[180px]" />
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default ChatsListItemSkeleton;
