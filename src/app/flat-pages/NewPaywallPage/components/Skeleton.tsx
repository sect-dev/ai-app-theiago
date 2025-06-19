const PaywallSkeleton = () => {
  return (
    <div className="w-full">
      {/* Gallery Skeleton */}
      <div className="relative mb-[12px] flex flex-col items-center gap-4">
        <div className="relative h-[345px] w-full max-w-md animate-pulse overflow-hidden rounded-b-[32px] bg-[#2B2D44]" />
        <div className="absolute bottom-0 mb-[16px] flex gap-[12px]">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="relative h-16 w-16 animate-pulse overflow-hidden rounded-[16px] bg-[#2B2D44]"
            />
          ))}
        </div>
      </div>

      {/* Advantages Skeleton */}
      <div className="mb-[24px]">
        <div className="mb-[16px] flex flex-col items-center justify-center">
          <div className="mb-[12px] h-[26px] w-[200px] animate-pulse rounded-lg bg-[#2B2D44]" />
          <div className="flex flex-col items-center justify-center">
            <div className="mb-[4px] h-[24px] w-[180px] animate-pulse rounded-lg bg-[#2B2D44]" />
            <div className="flex gap-[4px]">
              <div className="h-[24px] w-[120px] animate-pulse rounded-lg bg-[#2B2D44]" />
              <div className="h-[24px] w-[120px] animate-pulse rounded-lg bg-[#2B2D44]" />
            </div>
          </div>
        </div>
        <div className="mb-[16px] grid grid-cols-2 grid-rows-2 gap-[8px]">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="flex animate-pulse items-center rounded-[24px] bg-[#2B2D44] p-[12px]"
            >
              <div className="mr-[12px] size-[40px] rounded-xl bg-[#121423]" />
              <div className="flex flex-col gap-2">
                <div className="h-[14px] w-[60px] rounded bg-[#121423]" />
                <div className="h-[14px] w-[80px] rounded bg-[#121423]" />
              </div>
            </div>
          ))}
        </div>
        <div className="mb-[8px] h-[60px] w-full animate-pulse rounded-[24px] bg-[#2B2D44]" />
        <div className="mx-auto h-[16px] w-[250px] animate-pulse rounded bg-[#2B2D44]" />
      </div>

      {/* Plans Skeleton */}
      <div className="mb-[24px] space-y-[12px]">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="relative animate-pulse rounded-[24px] bg-[#2B2D44] p-[16px]"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-[16px] w-[100px] rounded bg-[#121423]" />
                <div className="h-[12px] w-[120px] rounded bg-[#121423]" />
              </div>
              <div className="h-[24px] w-[80px] rounded bg-[#121423]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaywallSkeleton;
