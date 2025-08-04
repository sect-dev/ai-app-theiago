import React from "react";

const ClothingComponentSkeleton = () => {
	return (
		<div>
			{/* Skeleton для заголовка */}
			<div className="flex items-center justify-center">
				<div className="mb-[12px] h-[20px] w-[80px] animate-pulse rounded-[8px] bg-skeleton" />
			</div>

			{/* Skeleton для табов */}
			<div className="mb-[16px] flex items-center justify-center gap-[8px]">
				<div className="h-[34px] w-[60px] animate-pulse rounded-[12px] bg-skeleton" />
				<div className="h-[34px] w-[80px] animate-pulse rounded-[12px] bg-skeleton" />
			</div>

			{/* Skeleton для горизонтального скролла элементов */}
			<div className="custom-x-scrollbar relative mb-[32px] flex w-full overflow-x-auto overflow-y-hidden">
				<div className="flex gap-[12px] pb-4">
					{Array.from({ length: 5 }).map((_, index) => (
						<ClothingItemSkeleton key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

const ClothingItemSkeleton = () => {
	return (
		<div className="skeleton-shadow pointer-events-none max-h-[114px] min-h-[114px] min-w-[94px] max-w-[94px] shrink-0 overflow-hidden rounded-[16px]">
			{/* Skeleton для названия элемента внизу */}
		</div>
	);
};

export default ClothingComponentSkeleton;
