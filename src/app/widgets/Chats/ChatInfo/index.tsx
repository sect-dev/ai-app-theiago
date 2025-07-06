"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";
import clsx from "clsx";
import ChatsInfoPosts from "@/app/widgets/Chats/ChatInfo/ChatsInfoPosts";
import { Character } from "@/app/shared/api/types";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import IconBack from "../../../../../public/images/icons/icon-back.svg";
import ChatsInfoVideos from "@/app/widgets/Chats/ChatInfo/ChatsInfoVideos";
import { useRouter } from "next/navigation";

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

interface ComponentProps {
	characterInfo: Character;
}

const ChatInfo: FC<ComponentProps> = ({ characterInfo }) => {
	const {
		setInfoCollapse,
		characterInfoCollapse,
		isMobileInfoOpen,
		setMobileInfoOpen,
		setCharacters,
		characters
	} = useSelectedCardStore();
	const [tabs, setTabs] = useState<string>("Posts");
	const router = useRouter();
	const currentCharacter = characters?.find(
		(char) => char.id === characterInfo.id
	);
	const handleCollapse = () => setInfoCollapse(true);

	const handleTabs = (value: string) => setTabs(value);

	const handleClick = () => {
		router.push("/generate");
	};

	useEffect(() => {
		if (characters) {
			const characterIndex = characters.findIndex(
				(char) => char.id === characterInfo.id
			);

			if (characterIndex !== -1) {
				const character = characters[characterIndex];
				if (character.photos.length === 1) {
					character.photos = [
						...character.photos,
						...(characterInfo.listProfilePhoto || [])
					];
					character.startPhotosCount =
						characterInfo?.listProfilePhoto?.length ?? 0;
					setCharacters([...characters]);
					localStorage.setItem(
						"chatStartedCharacters",
						JSON.stringify([...characters])
					);
				}
			}
		}
	}, []);

	return (
		<div className="relative">
			<div
				className={clsx(
					"max-h-[calc(100vh-57px)] w-[292px] shrink-0 animate-fadeIn overflow-auto rounded-l-[8px] rounded-r-[24px] bg-[#121423] transition-all duration-300 md:absolute md:left-0 md:top-0 md:h-[calc(100svh-60px)] md:w-full md:-translate-x-[-105%]",
					{
						"mr-[-310px]": characterInfoCollapse,
						"md:!translate-x-0": isMobileInfoOpen
					}
				)}
			>
				<div className="chatInfoImage relative flex h-[293px] items-end overflow-hidden rounded-tl-[8px] rounded-tr-[24px] p-[20px]">
					{characterInfo?.imageZero && (
						<Image
							src={characterInfo?.imageZero}
							sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 292px"
							fill
							alt="image"
							className="object-cover object-top"
						/>
					)}
					<div className="relative z-[5]">
						<p className="text-[20px] font-semibold">{characterInfo.name}</p>
						<p className="text-[14px] font-medium opacity-[60%]">
							{characterInfo.shortDescription?.en}
						</p>
					</div>

					<button
						onClick={handleCollapse}
						className="absolute left-[20px] top-[20px] z-[5] flex size-[32px] items-center justify-center rounded-[12px] bg-[#191B2C] md:hidden"
					>
						<Image
							src={IconCollapse.src}
							width={IconCollapse.width}
							height={IconCollapse.height}
							alt="collapse image"
							className="block size-[18px] md:hidden"
						/>
					</button>
					<button
						onClick={() => setMobileInfoOpen(false)}
						className="absolute left-[20px] top-[20px] z-[5] hidden size-[32px] items-center justify-center rounded-[12px] bg-[#191B2C] md:flex"
					>
						<Image
							src={IconBack.src}
							width={IconBack.width}
							height={IconBack.height}
							alt="icon back"
							className=""
						/>
					</button>
				</div>
				<div className="p-[20px]">
					<p className="text-[14px] opacity-[60%]">
						{characterInfo.description.en}
					</p>
				</div>
				<div className="bg-[#121423]">
					<div className="flex gap-[20px] px-[20px]">
						{tabsCaptions.map((item) => {
							return (
								<button
									onClick={() => handleTabs(item.title)}
									key={item.id}
									className={clsx(
										"h-[27px] px-[7px] text-[14px] font-semibold opacity-[20%] transition-all duration-300",
										{
											"logo-gradient !opacity-100": tabs === item.title
										}
									)}
								>
									{item.title}
									<span
										className={clsx(
											"main-gradient block h-[6px] w-full rounded-t-[4px] opacity-0 transition-opacity duration-300",
											{
												"!opacity-100": tabs === item.title
											}
										)}
									/>
								</button>
							);
						})}
					</div>
					<div className="px-[8px] pb-[8px]">
						{tabs === "Posts" && (
							<ChatsInfoPosts content={currentCharacter?.photos ?? null} />
						)}
						{tabs === "Videos" && (
							<ChatsInfoVideos content={currentCharacter?.videos ?? null} />
						)}
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 z-[5] h-[80px] w-[288px] rounded-bl-[8px] rounded-br-[22px] bg-[#121423] px-[16px] pb-[20px] pt-[12px] md:hidden">
				<button
					onClick={handleClick}
					className="relative flex h-[48px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50"
				>
					<span className="relative z-[5] text-[15px] font-bold">
						Create Image
					</span>
					<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
				</button>
			</div>
		</div>
	);
};

export default ChatInfo;
