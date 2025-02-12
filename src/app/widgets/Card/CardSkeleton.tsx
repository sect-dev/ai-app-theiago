import React from 'react';

const CardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="skeleton-shadow flex items-end relative p-[0.94vw] w-[19.14vw] h-[30.08vw] rounded-[1.56vw] overflow-hidden sm:w-[44.60vw] sm:p-[3.20vw] sm:h-[71.47vw] sm:rounded-[5.33vw]">
          <div className="relative z-[2]">
            <div className="flex items-center gap-[0.16vw] mb-[0.63vw] sm:mb-[2.13vw]">
              <div className="rounded-[0.63vw] w-[3.59vw] animate-pulse h-[1.64vw] bg-skeleton sm:rounded-[6.40vw] sm:h-[4.60vw] sm:w-[12vw]" />
            </div>
            <p className="w-[4.69vw] h-[1.09vw] animate-pulse bg-skeleton rounded-[0.63vw] mb-[0.47vw] sm:rounded-[4.40vw] sm:h-[3.60vw] sm:w-[14vw] sm:mb-[2.13vw]" />
            <div className="space-y-[0.47vw] sm:space-y-[1.7vw]">
              <p className="bg-skeleton rounded-[0.63vw] animate-pulse w-[13.44vw] h-[1.09vw] sm:rounded-[4.40vw] sm:h-[3.80vw] sm:w-[35vw]" />
              <p className="bg-skeleton rounded-[0.63vw] animate-pulse w-[7.19vw] h-[1.09vw] sm:rounded-[4.40vw] sm:h-[3.80vw] sm:w-[25vw]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;