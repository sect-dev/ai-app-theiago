"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ImageEmptyChat from "@/../public/images/img/img-no-chat.svg";
import Link from "next/link";
// import ChatsList from "@/app/widgets/Chats/ChatsList";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import ChatsListSkeleton from "@/app/widgets/Chats/ChatsList/ChatsListSkeleton";
import { useTranslations } from "next-intl";

const Chatspage = () => {
	const { characters } = useSelectedCardStore();
	const [mounded, setMounded] = useState(false);
	const t = useTranslations("ChatsPage");

	useEffect(() => {
		setMounded(true);
	}, []);

	if (!characters && mounded) {
		return (
			<div className="ml-auto mr-[12px] h-[calc(100%-24px)] w-[calc(100vw-87px)] animate-fadeIn rounded-[24px] bg-[#121423] p-[24px] md:w-full md:rounded-[16px] md:p-[16px] sm:h-auto">
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
								Start communicating with someone soon! Everyone is waiting for
								you.
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

	// if (characters && mounded) {
	//   return <ChatsList/>
	// }

	return <ChatsListSkeleton />;
};

export default Chatspage;
