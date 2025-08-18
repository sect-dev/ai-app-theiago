import React from "react";

const CardSkeleton = () => {
	return (
		<>
			<div className="skeleton-shadow pointer-events-none relative flex h-[386px] items-end overflow-hidden rounded-[20px] p-[16px] md:p-[12px] sm:h-[270px]">
				<div className="relative z-[2]">
					<div className="mb-[8px] flex items-center gap-[2px]">
						<div className="h-[18px] w-[45px] animate-pulse rounded-[9px] bg-skeleton" />
					</div>
					<p className="mb-[6px] h-[18px] w-[80px] animate-pulse rounded-[8px] bg-skeleton" />
					<div className="space-y-[6px]">
						<p className="h-[14px] w-[172px] animate-pulse rounded-[8px] bg-skeleton" />
						<p className="h-[14px] w-[110px] animate-pulse rounded-[8px] bg-skeleton" />
					</div>
				</div>
			</div>
		</>
	);
};

CardSkeleton.displayName = "CardSkeleton";

export default CardSkeleton;
