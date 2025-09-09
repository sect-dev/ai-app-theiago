"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ImageEmptyChat from "../../../../public/images/img/img-no-chat.svg";
import ChatsList from "@/app/widgets/Chats/ChatsList";
import ChatsContent from "@/app/widgets/Chats/ChatsContent";
import ChatInfo from "@/app/widgets/Chats/ChatInfo";

import Link from "next/link";
import ChatsInfoSkeleton from "@/app/widgets/Chats/ChatInfo/ChatsInfoSkeleton";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { Character } from "@/app/shared/api/types";
import { getCharacterInfoById } from "@/app/shared/api/getCharacterById";
import { safeLocalStorage } from "@/app/shared/helpers";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/app/shared/store/authStore";

const Page = () => {
	const { selectedCharacterId, setSelectedCharacterId } =
		useSelectedCardStore();
	const [characterInfo, setCharacterInfo] = useState<Character | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const t = useTranslations("ChatsPage");
	const { setSelectedCharacterName } = useAuthStore();

	const getCharacterInfo = async (id: string) => {
		try {
			setLoading(true);
			if (id && id !== "9a9b9") {
				const response = await getCharacterInfoById(id);
				if (response) {
					setCharacterInfo(response);
					setSelectedCharacterName(response.name);
					return setSelectedCharacterId(response.id);
				}
			} else {
				const chats = safeLocalStorage.get("chatStartedCharacters");
				if (chats && selectedCharacterId !== "9a9b9") {
					const chatStartedCharacters = JSON.parse(chats);
					const lastChatId =
						chatStartedCharacters[chatStartedCharacters.length - 1].id;
					const response = await getCharacterInfoById(lastChatId);

					if (response) {
						setCharacterInfo(response);
						return setSelectedCharacterId(response.id);
					}
				} else {
					setSelectedCharacterId(null);
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (selectedCharacterId !== "9a9b9") {
			const id = selectedCharacterId ? selectedCharacterId.toString() : "";
			console.log("character____Id", id);
			getCharacterInfo(id);
		}
	}, [selectedCharacterId]);

	if (!loading && !characterInfo) {
		return (
			<div className="ml-auto mr-[12px] h-[calc(100%-24px)] animate-fadeIn rounded-[24px] bg-[#121423] p-[24px] md:w-full md:rounded-[16px] md:p-[16px] sm:h-auto">
				<div className="container h-full md:w-[92vw]">
					<p className="hidden text-[20px] font-medium md:mb-[16px] md:block">
						Chats
					</p>
					<div className="flex h-full flex-col items-center justify-center gap-[24px]">
						<Image
							src={ImageEmptyChat.src}
							width={ImageEmptyChat.width}
							height={ImageEmptyChat.height}
							alt="no chat icon"
							className="h-[210px] w-[270px]"
						/>
						<div className="mx-auto max-w-[270px] text-center">
							<p className="mb-[8px] text-[20px] font-semibold leading-[1.2em] tracking-[-0,04em]">
								{t("chats_no_chats_yet")}
							</p>
							<p className="mb-[16px] text-[14px] font-medium opacity-50">
								{t("chats_no_chats_yet_desc")}
							</p>
							<Link
								href="/"
								className="main-gradient mx-auto flex w-[140px] items-center justify-center rounded-[8px] px-[16px] py-[8px] text-[16px] font-bold md:h-[27px] md:px-[12px] md:text-[14px]"
							>
								<span className="relative z-[5]">
									{t("chats_no_chats_yet_button")}
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="relative flex gap-[12px] pr-[12px] md:flex-col md:px-[8px]">
			<ChatsList characterInfo={characterInfo} />
			<ChatsContent characterInfo={characterInfo} />
			{characterInfo ? (
				<ChatInfo characterInfo={characterInfo} />
			) : (
				<div className="block md:hidden">
					<ChatsInfoSkeleton />
				</div>
			)}
		</div>
	);

	// return (
	//   <div className="w-full">
	//     <div className="flex gap-[12px] md:flex-col">
	//       <div className="md:hidden w-full max-w-[260px] max-h-[calc(50vh+40px)]">
	//         <ChatsListSkeleton />
	//       </div>
	//       <div className="w-full space-y-[8px]">
	//         <ChatHeaderSkeleton />
	//         <div className="flex flex-col justify-end p-[20px] rounded-[8px] bg-[#121423] h-[calc(100vh-142px)]">
	//           <ChatsMessagesSkeleton />
	//         </div>
	//       </div>
	//       <ChatsInfoSkeleton />
	//     </div>
	//   </div>
	// )
};

export default Page;
