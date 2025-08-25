"use client";
import React, { FC } from "react";
import Image from "next/image";
import IconMessage from "@/../public/images/icons/icon-message.svg";
import clsx from "clsx";
import { Character } from "@/app/shared/api/types";
import { getMessageSize } from "@/app/shared/helpers";
import Spinner from "@/app/widgets/Spinner";
import { useStartChat } from "@/app/shared/hooks/useStartChat";
import { useTranslations } from "next-intl";

interface ComponentProps {
	avatar: Character;
}

const Card: FC<ComponentProps> = ({ avatar }) => {
	const { handleClick, isLoading } = useStartChat();
	const t = useTranslations("HomePage");

	return (
		<button
			onClick={() => handleClick(avatar)}
			className={clsx(
				"card group inner-shadow-border-none relative flex h-[386px] w-full animate-fadeIn cursor-pointer items-end overflow-hidden rounded-[20px] p-[16px] text-left transition-shadow duration-300 hover:shadow-card-shadow md:p-[12px] sm:h-[270px]",
				{
					"pointer-events-none": isLoading
				}
			)}
		>
			<>
				<Image
					src={`${avatar.avatar}?format=webp&quality=85&width=500`}
					fill
					sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 300px"
					alt="image"
					className="object-cover"
					priority={false}
				/>

				<span className="absolute right-[20px] top-[16px] flex h-[18px] items-center gap-[4px] rounded-[8px] bg-[#3B3E5E59] bg-opacity-20 px-[4px] text-[12px] font-medium backdrop-blur-[3px]">
					<Image
						src={IconMessage.src}
						width={IconMessage.width}
						height={IconMessage.height}
						alt="message icon"
						className="size-[12px]"
					/>
					{getMessageSize(5, avatar.position)}
				</span>
				<div className="relative z-[2] transition-all duration-300 group-hover:mb-[45px] md:group-hover:mb-[40px]">
					{avatar.tags?.length > 0 && (
						<div className="mb-[14px] flex items-center gap-[4px] font-semibold">
							<div className="h-[21px] rounded-[20px] bg-[#426EFD] px-[4px] text-[14px] font-semibold capitalize md:text-[12px]">
								{avatar.tags[0]}
							</div>
						</div>
					)}
					<p className="text-[16px] font-semibold md:text-[14px]">
						{avatar.name}
					</p>
					<p className="card-description line-clamp-2 text-[14px] leading-[1.2em] opacity-[60%] md:text-[12px]">
						{avatar.description.en}
					</p>
				</div>
				<div className="absolute -bottom-[35px] left-1/2 z-[10] w-full -translate-x-1/2 px-[16px] transition-all duration-300 group-hover:bottom-[14px] md:-bottom-[35px] md:px-[12px] md:group-hover:bottom-[9px]">
					<div
						className={clsx(
							"main-gradient h-[35px] w-full rounded-[12px] text-[14px] font-semibold text-white md:h-[30px] md:text-[12px]",
							{}
						)}
					>
						<span className="relative z-[5] flex h-full items-center justify-center gap-[8px]">
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18.3332 10.7166C18.3332 12.6249 17.3499 14.3166 15.8332 15.3833L14.7166 17.8416C14.4582 18.3999 13.7082 18.5083 13.3166 18.0333L12.0832 16.5499C10.5332 16.5499 9.10824 16.0249 8.0249 15.1499L8.5249 14.5583C12.3749 14.2666 15.4166 11.2166 15.4166 7.49994C15.4166 6.8666 15.3249 6.2416 15.1582 5.6416C17.0499 6.6416 18.3332 8.5416 18.3332 10.7166Z"
									fill="#fff"
								/>
								<path
									d="M13.5832 5.05841C12.6082 3.05841 10.4332 1.66675 7.9165 1.66675C4.4665 1.66675 1.6665 4.27508 1.6665 7.50008C1.6665 9.40841 2.64984 11.1001 4.1665 12.1667L5.28317 14.6251C5.5415 15.1834 6.2915 15.2834 6.68317 14.8167L7.1415 14.2667L7.9165 13.3334C11.3665 13.3334 14.1665 10.7251 14.1665 7.50008C14.1665 6.62508 13.9582 5.80008 13.5832 5.05841ZM9.99984 8.12508H5.83317C5.4915 8.12508 5.20817 7.84175 5.20817 7.50008C5.20817 7.15841 5.4915 6.87508 5.83317 6.87508H9.99984C10.3415 6.87508 10.6248 7.15841 10.6248 7.50008C10.6248 7.84175 10.3415 8.12508 9.99984 8.12508Z"
									fill="#fff"
								/>
							</svg>
							<span>{t("card_start_chat")}</span>
							{isLoading && <Spinner />}
						</span>
					</div>
				</div>
			</>
		</button>
	);
};

export default Card;
