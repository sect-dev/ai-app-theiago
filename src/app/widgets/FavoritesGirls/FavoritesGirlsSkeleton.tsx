import React from "react";

export default function FavoritesGirlsSkeleton() {
  return (
    <div className="flex gap-[14px] overflow-hidden">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="skeleton-shadow flex items-end relative p-[12px] w-[300px] h-[330px] rounded-[24px] overflow-hidden shrink-0 ">
          <div className="relative z-[2]">
            <div className="flex items-center gap-[2px] mb-[8px] md:gap-[4px]">
              <div className="rounded-[8px] w-[46px] animate-pulse h-[21px] bg-skeleton" />
              <div className="rounded-[8px] w-[50px] animate-pulse h-[21px] bg-skeleton" />
            </div>
            <p className="w-[4.69vw] h-[1.09vw] animate-pulse bg-skeleton rounded-[8px] mb-[0.47vw] sm:rounded-[4.40vw] sm:h-[3.60vw] sm:w-[14vw] sm:mb-[2.13vw]" />
            <div className="space-y-[0.47vw] sm:space-y-[1.7vw]">
              <p className="bg-skeleton rounded-[0.63vw] animate-pulse w-[13.44vw] h-[1.09vw] sm:rounded-[4.40vw] sm:h-[3.80vw] sm:w-[55vw]" />
              <p className="bg-skeleton rounded-[0.63vw] animate-pulse w-[7.19vw] h-[1.09vw] sm:rounded-[4.40vw] sm:h-[3.80vw] sm:w-[35vw]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
