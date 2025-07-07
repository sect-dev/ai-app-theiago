import React from "react";

const CreatePageSkeleton = () => {
	return (
		<div className="grid grid-cols-[auto_1fr_auto] gap-[12px] overflow-hidden p-[12px] xs:grid-cols-none xs:grid-rows-[auto_auto_auto] xs:p-[16px]">
			{/* CharacterBlock Skeleton */}
			<>
				{/* Mobile version */}
				<div className="hidden flex-col items-center xs:flex">
					<div className="mb-[16px] h-[26px] w-[120px] animate-pulse rounded-[8px] bg-skeleton" />
					<div className="relative mb-[12px]">
						<div className="h-[88px] w-[88px] animate-pulse rounded-[24px] bg-skeleton" />
						<div className="absolute -right-[6px] bottom-[4px] h-[32px] w-[40px] animate-pulse rounded-[16px] bg-skeleton" />
					</div>
					<div className="h-[24px] w-[80px] animate-pulse rounded-[8px] bg-skeleton" />
				</div>

				{/* Desktop version */}
				<div className="block w-[293px] rounded-tl-[24px] rounded-tr-[8px] xs:hidden">
					<div className="skeleton-shadow relative h-[293px] w-full rounded-tl-[24px] rounded-tr-[8px]">
						<div className="absolute left-[20px] top-[20px] h-[40px] w-[80px] animate-pulse rounded-[8px] bg-skeleton" />
						<div className="absolute bottom-[20px] left-[20px] grid grid-rows-2 gap-[4px]">
							<div className="h-[26px] w-[120px] animate-pulse rounded-[8px] bg-skeleton" />
							<div className="h-[21px] w-[90px] animate-pulse rounded-[8px] bg-skeleton" />
						</div>
					</div>
					<div className="rounded-bl-[24px] rounded-br-[8px] bg-[#121423] p-[20px]">
						<div className="space-y-[8px]">
							<div className="h-[21px] w-full animate-pulse rounded-[8px] bg-skeleton" />
							<div className="h-[21px] w-[80%] animate-pulse rounded-[8px] bg-skeleton" />
							<div className="h-[21px] w-[60%] animate-pulse rounded-[8px] bg-skeleton" />
						</div>
					</div>
				</div>
			</>

			{/* CreateImageBlock Skeleton */}
			<div className="min-w-[411px] xs:min-w-full">
				<div className="flex flex-col">
					<div className="mb-[16px] grid grid-rows-[1fr_auto] gap-[12px] rounded-[8px] bg-[#121423] p-[20px] xs:rounded-[16px]">
						{/* TextArea skeleton */}
						<div className="space-y-[8px]">
							<div className="h-[21px] w-full animate-pulse rounded-[8px] bg-skeleton" />
							<div className="h-[21px] w-[70%] animate-pulse rounded-[8px] bg-skeleton" />
							<div className="h-[21px] w-[50%] animate-pulse rounded-[8px] bg-skeleton" />
						</div>
						{/* Button skeleton */}
						<div className="flex flex-row justify-between">
							<div className="h-[40px] w-[100px] animate-pulse rounded-[8px] bg-skeleton" />
						</div>
					</div>

					{/* SuggestionsBlock skeleton */}
					<div className="mb-[16px] space-y-[8px]">
						<div className="flex flex-wrap gap-[8px]">
							{Array.from({ length: 6 }).map((_, index) => (
								<div
									key={index}
									className="h-[32px] w-[80px] animate-pulse rounded-[16px] bg-skeleton"
								/>
							))}
						</div>
					</div>

					{/* Create Image Button skeleton - Desktop */}
					<div className="relative mb-[8px] h-[60px] w-full animate-pulse rounded-[24px] bg-skeleton xs:hidden" />
				</div>
			</div>

			{/* CreatedBlock Skeleton */}
			<div className="mb-[150px] h-fit w-[332px] rounded-[8px] bg-[#121423] p-[20px] xs:bg-transparent xs:p-0">
				<div className="grid grid-rows-[auto_1fr] gap-[12px]">
					<div className="h-[24px] w-[80px] animate-pulse rounded-[8px] bg-skeleton" />

					{/* Empty state skeleton */}
					<div className="rounded-[24px] bg-[#191B2C] px-[20px] py-[16px] xs:bg-[#121423]">
						<div className="mb-[8px] h-[80px] w-[80px] animate-pulse rounded-[8px] bg-skeleton" />
						<div className="flex flex-col space-y-[4px]">
							<div className="h-[24px] w-[150px] animate-pulse rounded-[8px] bg-skeleton" />
							<div className="h-[18px] w-[200px] animate-pulse rounded-[8px] bg-skeleton" />
						</div>
					</div>
				</div>
			</div>

			{/* Fixed Mobile Button skeleton */}
			<div className="fixed bottom-[5vw] left-1/2 z-[50] hidden -translate-x-1/2 xs:block">
				<div className="h-[60px] w-[343px] animate-pulse rounded-[24px] bg-skeleton" />
			</div>
		</div>
	);
};

export default CreatePageSkeleton;
