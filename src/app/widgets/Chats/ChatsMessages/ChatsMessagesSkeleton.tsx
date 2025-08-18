import React from "react";
import clsx from "clsx";
import Image from "next/image";
import IconSend from "@/../public/images/icons/icon-send.svg";

const ChatsMessagesSkeleton = () => {
	return (
		<div className="h-full rounded-[8px] bg-[#121423] p-[20px]">
			<div className="h-[calc(100%-140px)] space-y-[12px]">
				<p className="h-[38px] w-[210px] animate-pulse rounded-[20px] rounded-bl-none bg-[#21233A] px-[20px] py-[10px]" />
				<p className="h-[38px] w-[290px] animate-pulse rounded-[20px] rounded-bl-none bg-[#21233A] px-[20px] py-[10px]" />
				<p className="h-[38px] w-[150px] animate-pulse rounded-[20px] rounded-bl-none bg-[#21233A] px-[20px] py-[10px] font-medium" />
			</div>
			<div className="relative flex gap-[8px]">
				<div className="h-[48px] w-full animate-pulse resize-none rounded-[16px] bg-[#21233A] p-[12px] text-[14px] leading-[1.2em] placeholder:opacity-50" />
				<div
					className={clsx(
						"transition-bg shrink-0 animate-pulse rounded-[16px] bg-[#21233A] p-[12px] duration-300 hover:bg-[#2E335B]",
						{}
					)}
				>
					<div className="size-[24px]">
						<Image
							src={IconSend.src}
							width={IconSend.width}
							height={IconSend.height}
							alt="send message icon"
							className="size-[24px] opacity-50"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatsMessagesSkeleton;
