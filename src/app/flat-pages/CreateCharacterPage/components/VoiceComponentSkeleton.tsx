import React from "react";

const VoiceComponentSkeleton = () => {
	return (
		<div className="mb-[12px]">
			{/* Skeleton для заголовка */}
			<div className="flex items-center justify-center">
				<div className="mb-[8px] h-[24px] w-[60px] animate-pulse rounded-[8px] bg-skeleton" />
			</div>

			{/* Skeleton для Swiper контейнера */}
			<div className="relative flex gap-5 overflow-hidden">
				{/* Skeleton для карточек голосов */}
				{Array.from({ length: 3 }).map((_, cardIndex) => (
					<VoiceCardSkeleton key={cardIndex} />
				))}

				{/* Skeleton для навигационных кнопок */}
				<div className="absolute right-0 top-1/2 z-10 flex h-[42px] w-[42px] -translate-y-1/2 animate-pulse items-center justify-center rounded-full bg-skeleton" />
				<div className="absolute left-0 top-1/2 z-10 flex h-[42px] w-[42px] -translate-y-1/2 animate-pulse items-center justify-center rounded-full bg-skeleton" />
			</div>
		</div>
	);
};

const VoiceCardSkeleton = () => {
	return (
		<div className="flex h-[105px] w-[142px] shrink-0 flex-col items-start rounded-[16px] bg-[#1D1F37] p-[16px]">
			{/* Skeleton для кнопки воспроизведения */}
			<div className="mb-[16px] h-[32px] w-[32px] animate-pulse rounded-full bg-skeleton" />

			{/* Skeleton для текста названия голоса */}
			<div className="h-[18px] w-[80px] animate-pulse rounded-[8px] bg-skeleton" />
		</div>
	);
};

export default VoiceComponentSkeleton;
