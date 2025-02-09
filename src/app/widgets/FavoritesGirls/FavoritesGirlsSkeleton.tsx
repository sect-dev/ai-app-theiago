import React from "react";

export default function FavoritesGirlsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="skeleton-shadow flex items-end relative p-[0.94vw] w-[23.44vw] h-[25.78vw] rounded-[1.56vw] overflow-hidden">
          <div className="relative z-[2]">
            <div className="flex items-center gap-[0.16vw] mb-[0.63vw]">
              <div className="rounded-[0.63vw] w-[3.59vw] animate-pulse h-[1.64vw] bg-skeleton" />
              <div className="rounded-[0.63vw] w-[3.59vw] animate-pulse h-[1.64vw] bg-skeleton" />
            </div>
            <p className="w-[4.69vw] h-[1.09vw] animate-pulse bg-skeleton rounded-[0.63vw] mb-[0.47vw]" />
            <div className="space-y-[0.47vw]">
              <p className="bg-skeleton rounded-[0.63vw] animate-pulse w-[13.44vw] h-[1.09vw]" />
              <p className="bg-skeleton rounded-[0.63vw] animate-pulse w-[7.19vw] h-[1.09vw]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
