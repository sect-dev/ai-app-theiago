const TagsSkeleton = ({ seed }: { seed: number }) => {
  const width = 50 + (seed % 25); // 50-75px
  const mobileWidth = 60 + (seed % 20); // 60-80px

  return (
    <>
      <div
        style={{ width: `${width}px` }}
        className="block rounded-[12px] animate-pulse bg-[#1D1F37] h-[30px] sm:hidden"
      />
      <div
        style={{ width: `${mobileWidth}px` }}
        className="hidden shrink-0 rounded-[2.94vw] animate-pulse bg-[#1D1F37] h-[7.47vw] sm:block"
      />
    </>
  );
};

export default TagsSkeleton
