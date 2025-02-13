import React from "react";

const TagsSkeleton = () => {
  return (
    <>
      {Array.from({length: 10}).map((_,index) => {
        const randomWidth = (3.5 + Math.random() * (5.5 - 3.5)).toFixed(2) + "vw";
        const randomWidthMobile = (15 + Math.random() * (16 - 19.5)).toFixed(2) + "vw";
        return (
          <>
            <div style={{ width: randomWidth }} key={index} className="block rounded-[0.94vw] animate-pulse bg-[#1D1F37] h-[2.35vw] sm:hidden" />
            <div style={{ width: randomWidthMobile }} key={index + 1} className="hidden shrink-0 rounded-[2.94vw] animate-pulse bg-[#1D1F37] h-[7.47vw] sm:block" />
          </>
        )
      })}
    </>
  );
};

export default TagsSkeleton;
