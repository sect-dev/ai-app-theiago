import React from "react";

const TokenPackagesSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-[10px] py-[30px]">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <div
            key={index}
            className="h-[105px] w-full rounded-[16px] bg-[#21233A] p-[12px] pt-[50px] sm:!w-[41.89vw]"
          >
            <p className="mb-[5px] h-[20px] w-[80px] animate-pulse rounded-full bg-[#121423]" />
            <p className="h-[12px] w-[40px] animate-pulse rounded-full bg-[#121423]" />
          </div>
        );
      })}
    </div>
  );
};

export default TokenPackagesSkeleton;
