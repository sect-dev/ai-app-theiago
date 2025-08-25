import React from "react";
import Image from "next/image";
import clsx from "clsx";
import IconCollapse from "../../../../../public/images/icons/icon-collapse.svg";
import ChatsInfoPosts from "@/app/widgets/Chats/ChatInfo/ChatsInfoPosts";

const tabsCaptions = [
	{
		title: "Posts",
		id: 1
	},
	{
		title: "Videos",
		id: 2
	}
];

const ChatsInfoSkeleton = () => {
	return (
		<div
			className={clsx(
				"transition-width block max-h-[calc(100vh-57px)] w-[292px] shrink-0 overflow-auto rounded-l-[8px] rounded-r-[24px] bg-[#121423] duration-300 sm:hidden",
				{}
			)}
		>
			<div className="relative flex h-[293px] items-end overflow-hidden rounded-tl-[8px] rounded-tr-[24px] bg-[#1F2237] p-[20px]">
				<div className="relative z-[5] space-y-[8px]">
					<div className="h-[20px] w-[80px] animate-pulse rounded-[9px] bg-[#121423]" />
					<div className="h-[20px] w-[80px] animate-pulse rounded-[9px] bg-[#121423]" />
				</div>
				<button className="absolute left-[20px] top-[20px] z-[5] flex size-[32px] items-center justify-center rounded-[12px] bg-[#191B2C]">
					<Image
						src={IconCollapse.src}
						width={IconCollapse.width}
						height={IconCollapse.height}
						alt="collapse image"
						className="size-[18px]"
					/>
				</button>
			</div>
			<div className="space-y-[8px] p-[20px]">
				<div className="h-[16px] w-full animate-pulse rounded-[12px] bg-[#1F2237]" />
				<div className="h-[16px] w-full animate-pulse rounded-[12px] bg-[#1F2237]" />
				<div className="h-[16px] w-1/2 animate-pulse rounded-[12px] bg-[#1F2237]" />
			</div>
			<div>
				<div className="flex gap-[20px] px-[20px]">
					{tabsCaptions.map((item) => {
						return (
							<button
								key={item.id}
								className={clsx(
									"h-[27px] px-[7px] text-[14px] font-semibold opacity-[20%] transition-all duration-300",
									{
										"logo-gradient !opacity-100": "Posts" === item.title
									}
								)}
							>
								{item.title}
								<span
									className={clsx(
										"main-gradient block h-[6px] w-full rounded-t-[4px] opacity-0 transition-opacity duration-300",
										{
											"!opacity-100": "Posts" === item.title
										}
									)}
								/>
							</button>
						);
					})}
				</div>
				<div className="flex max-h-[34vh] flex-wrap gap-[8px] overflow-auto px-[8px] pb-[8px]">
					{Array.from({ length: 4 }).map((_, index) => {
						return (
							<div
								key={index}
								className="h-[157px] w-[48%] animate-pulse rounded-[12px] bg-[#1F2237]"
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ChatsInfoSkeleton;
