import React from "react";

const TagsSkeleton = () => {
  return (
    <>
      {Array.from({length: 15}).map((_,index) => {
        const randomWidth = (55 + Math.random() * (55 - 75)).toFixed(2) + "px";
        const randomWidthMobile = (60 + Math.random() * (60 - 80)).toFixed(2) + "px";
        return (
          <>
            <div style={{ width: randomWidth }} key={index} className="block rounded-[12px] animate-pulse bg-[#1D1F37] h-[30px] sm:hidden" />
            <div style={{ width: randomWidthMobile }} key={index + 1} className="hidden shrink-0 rounded-[2.94vw] animate-pulse bg-[#1D1F37] h-[7.47vw] sm:block" />
          </>
        )
      })}
    </>
  );
};

export default TagsSkeleton;
