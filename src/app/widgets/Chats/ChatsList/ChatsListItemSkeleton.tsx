import React from "react";

const ChatsListItemSkeleton = () => {
	return (
		<div className="space-y-[14px]">
			<div className={"flex px-[20px]"}>
				<span className="flex items-center gap-[8px]">
					<div className="relative">
						<div className="relative block size-[42px] animate-pulse overflow-hidden rounded-[16px] bg-[#1F2237]" />
					</div>
					{true && (
						<div className="animate-fadeIn space-y-[4px] delay-300">
							<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium" />
							<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium md:w-[180px]" />
						</div>
					)}
				</span>
			</div>
		</div>
	);
};

export default ChatsListItemSkeleton;
