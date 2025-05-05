import React from "react";

export default function FavoritesGirlsSkeleton() {
  return (
    <div className="skeleton-shadow relative flex h-[330px] w-[300px] shrink-0 items-end overflow-hidden rounded-[24px] p-[12px]">
      <div className="relative z-[2]">
        <div className="mb-[8px] flex items-center gap-[2px] md:gap-[4px]">
          <div className="h-[21px] w-[46px] animate-pulse rounded-[8px] bg-skeleton" />
          <div className="h-[21px] w-[50px] animate-pulse rounded-[8px] bg-skeleton" />
        </div>
        <p className="mb-[0.47vw] h-[1.09vw] w-[4.69vw] animate-pulse rounded-[8px] bg-skeleton sm:mb-[2.13vw] sm:h-[3.60vw] sm:w-[14vw] sm:rounded-[4.40vw]" />
        <div className="space-y-[0.47vw] sm:space-y-[1.7vw]">
          <p className="h-[1.09vw] w-[13.44vw] animate-pulse rounded-[0.63vw] bg-skeleton sm:h-[3.80vw] sm:w-[55vw] sm:rounded-[4.40vw]" />
          <p className="h-[1.09vw] w-[7.19vw] animate-pulse rounded-[0.63vw] bg-skeleton sm:h-[3.80vw] sm:w-[35vw] sm:rounded-[4.40vw]" />
        </div>
      </div>
    </div>
  );
}
