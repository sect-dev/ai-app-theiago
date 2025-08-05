import React from "react";

interface Props {
	numberOfCategories: number;
}

const BasicInfoComponentSkeleton = (props: Props) => {
	const { numberOfCategories } = props;
	return (
		<div>
			{Array.from({ length: numberOfCategories }).map((_, categoryIndex) => (
				<div key={categoryIndex} className="mb-8">
					{/* Skeleton для заголовка */}
					<div className="flex items-center justify-center">
						<div className="mb-[8px] h-[24px] w-[140px] animate-pulse rounded-[8px] bg-skeleton" />
					</div>

					{/* Skeleton для Swiper контейнера */}
					<div className="relative flex gap-5 overflow-hidden">
						{/* Skeleton для карточек */}
						{Array.from({ length: 3 }).map((_, cardIndex) => (
							<BasicInfoCardSkeleton key={cardIndex} />
						))}

						{/* Skeleton для навигационных кнопок */}
						<div className="absolute right-0 top-1/2 z-10 flex h-[42px] w-[42px] -translate-y-1/2 animate-pulse items-center justify-center rounded-full bg-skeleton" />
						<div className="absolute left-0 top-1/2 z-10 flex h-[42px] w-[42px] -translate-y-1/2 animate-pulse items-center justify-center rounded-full bg-skeleton" />
					</div>
				</div>
			))}
		</div>
	);
};

const BasicInfoCardSkeleton = () => {
	return (
		<div className="skeleton-shadow pointer-events-none h-[217px] w-[180px] shrink-0 overflow-hidden rounded-[16px]">
			{/* Skeleton для заголовка внизу карточки */}
			<div className="absolute bottom-0 left-0 right-0 z-[1] p-[12px]">
				<div className="h-[18px] w-[80px] animate-pulse rounded-[8px] bg-skeleton" />
			</div>
		</div>
	);
};

export default BasicInfoComponentSkeleton;
