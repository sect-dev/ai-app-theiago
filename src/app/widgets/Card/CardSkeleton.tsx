import React from "react";

const CardSkeleton = () => {
  return (
    <>
      <div className="skeleton-shadow flex items-end relative p-[16px] h-[386px] pointer-events-none rounded-[20px] overflow-hidden md:p-[12px] sm:h-[270px]">
        <div className="relative z-[2]">
          <div className="flex items-center gap-[2px] mb-[8px]">
            <div className="rounded-[9px] w-[45px] animate-pulse h-[18px] bg-skeleton " />
          </div>
          <p className="w-[80px] h-[18px] animate-pulse bg-skeleton rounded-[8px] mb-[6px]" />
          <div className="space-y-[6px] ">
            <p className="bg-skeleton rounded-[8px] animate-pulse w-[172px] h-[14px] " />
            <p className="bg-skeleton rounded-[8px] animate-pulse w-[110px] h-[14px] " />
          </div>
        </div>
      </div>
    </>
  );
};

CardSkeleton.displayName = "CardSkeleton";

export default CardSkeleton;
