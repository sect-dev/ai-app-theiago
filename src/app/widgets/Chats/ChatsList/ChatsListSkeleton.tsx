"use client";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";

const ChatsListSkeleton = () => {
	const [collapse, setCollapse] = useState<boolean>(false);

	const handleCollapse = () => {
		setCollapse(!collapse);
	};

	return (
		<div
			className={clsx(
				"transition-width max-h-[50vh] w-full max-w-[260px] rounded-l-[24px] rounded-r-[8px] bg-[#121423] py-[20px] duration-300 md:max-w-full",
				{
					"max-w-[82px]": collapse
				}
			)}
		>
			<div className="mb-[9px] flex items-center justify-between px-[20px]">
				{!collapse && (
					<p className="animate-fadeIn text-[17px] font-medium">Chats</p>
				)}
				<button
					onClick={handleCollapse}
					className="flex size-[32px] items-center justify-center rounded-[12px] bg-[#191B2C] md:hidden"
				>
					<Image
						src={IconCollapse.src}
						width={IconCollapse.width}
						height={IconCollapse.height}
						alt="collapse image"
						className="size-[18px]"
					/>
				</button>
			</div>
			<div className="space-y-[14px]">
				<div className={"flex px-[20px]"}>
					<span className="flex items-center gap-[8px]">
						<div className="relative">
							<div className="relative block size-[42px] animate-pulse overflow-hidden rounded-[16px] bg-[#1F2237]" />
						</div>
						{!collapse && (
							<div className="animate-fadeIn space-y-[4px] delay-300">
								<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium" />
								<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium md:w-[180px]" />
							</div>
						)}
					</span>
				</div>
				<div className={"flex px-[20px]"}>
					<span className="flex items-center gap-[8px]">
						<div className="relative">
							<div className="relative block size-[42px] animate-pulse overflow-hidden rounded-[16px] bg-[#1F2237]" />
						</div>
						{!collapse && (
							<div className="animate-fadeIn space-y-[4px] delay-300">
								<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium" />
								<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium md:w-[180px]" />
							</div>
						)}
					</span>
				</div>
				<div className={"flex px-[20px]"}>
					<span className="flex items-center gap-[8px]">
						<div className="relative">
							<div className="relative block size-[42px] animate-pulse overflow-hidden rounded-[16px] bg-[#1F2237]" />
						</div>
						{!collapse && (
							<div className="animate-fadeIn space-y-[4px] delay-300">
								<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium" />
								<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium md:w-[180px]" />
							</div>
						)}
					</span>
				</div>
				<div className={"flex px-[20px]"}>
					<span className="flex items-center gap-[8px]">
						<div className="relative">
							<div className="relative block size-[42px] animate-pulse overflow-hidden rounded-[16px] bg-[#1F2237]" />
						</div>
						{!collapse && (
							<div className="animate-fadeIn space-y-[4px] delay-300">
								<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium" />
								<div className="h-[18px] w-[81px] animate-pulse rounded-[9px] bg-[#1F2237] font-medium md:w-[180px]" />
							</div>
						)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ChatsListSkeleton;
