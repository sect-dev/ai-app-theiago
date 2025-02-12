import React from "react";

export default function FavoritesGirlsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="skeleton-shadow flex items-end relative p-[0.94vw] w-[23.44vw] h-[25.78vw] rounded-[1.56vw] overflow-hidden sm:p-[3.20vw] sm:rounded-[6.40vw] sm:shrink-0 sm:h-[88vw] sm:w-[80vw]">
          <div className="relative z-[2]">
            <div className="flex items-center gap-[0.16vw] mb-[0.63vw] sm:gap-[1.2vw] sm:mb-[2.13vw]">
              <div className="rounded-[0.63vw] w-[3.59vw] animate-pulse h-[1.64vw] bg-skeleton sm:rounded-[6.40vw] sm:h-[4.60vw] sm:w-[12vw]" />
              <div className="rounded-[0.63vw] w-[3.59vw] animate-pulse h-[1.64vw] bg-skeleton sm:rounded-[6.40vw] sm:h-[4.60vw] sm:w-[12vw]" />
            </div>
            <p className="w-[4.69vw] h-[1.09vw] animate-pulse bg-skeleton rounded-[0.63vw] mb-[0.47vw] sm:rounded-[4.40vw] sm:h-[3.60vw] sm:w-[14vw] sm:mb-[2.13vw]" />
            <div className="space-y-[0.47vw] sm:space-y-[1.7vw]">
              <p className="bg-skeleton rounded-[0.63vw] animate-pulse w-[13.44vw] h-[1.09vw] sm:rounded-[4.40vw] sm:h-[3.80vw] sm:w-[55vw]" />
              <p className="bg-skeleton rounded-[0.63vw] animate-pulse w-[7.19vw] h-[1.09vw] sm:rounded-[4.40vw] sm:h-[3.80vw] sm:w-[35vw]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
