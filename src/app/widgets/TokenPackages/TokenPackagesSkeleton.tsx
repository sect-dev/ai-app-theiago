import React from "react";

const TokenPackagesSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-[10px] py-[30px]">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <div
            key={index}
            className="bg-[#21233A] w-full h-[105px] rounded-[16px] p-[12px] pt-[50px] sm:!w-[41.89vw]"
          >
            <p className="animate-pulse w-[80px] h-[20px] bg-[#121423] mb-[5px] rounded-full" />
            <p className="animate-pulse w-[40px] h-[12px] bg-[#121423] rounded-full" />
          </div>
        );
      })}
    </div>
  );
};

export default TokenPackagesSkeleton;
