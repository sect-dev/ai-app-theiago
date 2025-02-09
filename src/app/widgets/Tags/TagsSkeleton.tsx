import React from 'react';

const TagsSkeleton = () => {
  return (
    <>
      {Array.from({length: 10}).map((_,index) => {
        const randomWidth = (3.5 + Math.random() * (5.5 - 3.5)).toFixed(2) + "vw";
        return (
          <li style={{ width: randomWidth }} key={index} className="rounded-[0.94vw] animate-pulse bg-[#1D1F37] h-[2.35vw]" />
        )
      })}
    </>
  );
};

export default TagsSkeleton;