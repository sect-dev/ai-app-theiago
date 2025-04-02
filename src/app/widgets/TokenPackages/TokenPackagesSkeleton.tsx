import React from 'react';

const TokenPackagesSkeleton = () => {
  return (
    <div className="flex gap-[10px] ">
      {Array.from({length:2}).map((_,index) => {
        return (
          <div key={index} className="bg-[#21233A] w-[48%] rounded-[16px] p-[12px]">
            <p className="animate-pulse w-[50px] h-[15px] bg-[#121423]" />
            <p className="animate-pulse w-[30px] h-[12px] bg-[#121423]" />
          </div>
        )
      })}
    </div>
  );
};

export default TokenPackagesSkeleton;