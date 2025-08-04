"use client";
import React, { FC } from "react";
import Image from "next/image";
import IcnPlus from "@/../public/images/icons/icon-plus.svg";
import IcnCoins from "@/../public/images/icons/icon-coins.svg";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import clsx from "clsx";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";
import IconBack from "@/../public/images/icons/icon-back.svg";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { useTranslations } from "next-intl";

interface ComponentProps {
	avatar: string | null;
	name: string | null;
}

const ChatsHeader: FC<ComponentProps> = ({ avatar, name }) => {
	const {
		setMobileChatOpen,
		setInfoCollapse,
		characterInfoCollapse,
		setMobileInfoOpen,
		setSelectedCharacterId
	} = useSelectedCardStore();
	const { setTokensModal, tokens } = usePaymentStore();
	const t = useTranslations("ChatsPage");

	const handleBack = () => {
		setMobileChatOpen(false);
		setSelectedCharacterId("9a9b9");
	};

	const handleInfoOpen = () => {
		setMobileInfoOpen(true);
	};

	const getTokensHandle = () => {
		setTokensModal(true);
	};

	return (
		<div
			className={clsx(
				"flex shrink-0 animate-fadeIn items-center justify-between overflow-hidden rounded-[8px] bg-[#121423] px-[24px] py-[16px] transition-transform duration-300 md:shrink-0 md:rounded-[16px] md:px-[12px] md:py-[14px]",
				{}
			)}
		>
			<div className="flex items-center gap-[10px]">
				<div
					onClick={handleBack}
					className="flex hidden size-[28px] items-center justify-center rounded-[8px] bg-[#191B2C] md:flex"
				>
					<Image
						src={IconBack.src}
						width={IconBack.width}
						height={IconBack.height}
						alt="icon back"
					/>
				</div>
				<div onClick={handleInfoOpen} className="flex items-center gap-[12px]">
					<div className="flex items-center gap-[12px]">
						<span className="relative block size-[42px] overflow-hidden rounded-[16px]">
							<Image
								src={avatar ?? ""}
								fill
								sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 42px"
								alt="nicole image"
								className="object-cover object-top"
							/>
						</span>
						<div className="text-left">
							<p className="mb-[2px] text-[17px] font-medium tracking-[-0.04em]">
								{name}
							</p>
							<p className="flex max-w-[125px] items-center gap-[4px] font-medium">
								<span className="block size-[4px] rounded-full bg-[#4DCF9F]" />
								<span className="line-clamp-1 text-[12px] tracking-[-0.04em] opacity-50">
									{t("chats_header_online")}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-[8px]">
				<button
					onClick={() => setInfoCollapse(false)}
					className={clsx(
						"z-[5] flex hidden size-[32px] animate-fadeIn items-center justify-center rounded-[12px] bg-[#191B2C]",
						{
							"!flex": characterInfoCollapse
						}
					)}
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
		</div>
	);
};

export default ChatsHeader;
