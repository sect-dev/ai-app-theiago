"use client";

import Image from "next/image";
import TagsButton from "./TagsButton";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import { useEffect, useState } from "react";
import { lastAssembledRequest } from "@/app/shared/api/assembleRequest";
import { LastAssembledContentResponse } from "@/app/shared/api/types/assembleRequest";
import { Character } from "@/app/shared/api/types";
import CreatedContent from "./CreatedContent";
import Lottie from "lottie-react";
import SparklingAnimationLottie from "@/../public/lotties/sparkling-starts-lottie.json";
import LoadingImage from "@/../public/images/img/image-loading-generator.png";
import { useTranslations } from "next-intl";

interface Tag {
	id: number;
	text: string;
	type: "image" | "video";
}

const ANIMATION_OPTIONS = {
	loop: true,
	autoplay: true,
	animationData: SparklingAnimationLottie,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice"
	}
};

const CreatedBlock = () => {
	const { isLoading, generatedAssets, characterId } = useGenerateImageStore();
	const [lastAssembledContent, setLastAssembledContent] = useState<
		LastAssembledContentResponse[] | null
	>(null);
	const t = useTranslations("ImageGenerator");

	const hasContent = lastAssembledContent && lastAssembledContent.length > 0;
	const shouldShowEmpty = !hasContent && !isLoading;

	const fetchContent = async (contentType: "image") => {
		if (!characterId) return;

		try {
			const response = await lastAssembledRequest({
				type: contentType,
				characterId: characterId
			});

			if (response) {
				setLastAssembledContent(response);
			}
		} catch (error) {
			console.log("error fetching content", error);
		}
	};

	console.log("generatedAssets", generatedAssets);

	useEffect(() => {
		fetchContent("image");
	}, [characterId, generatedAssets]);

	return (
		<div className="mb-[150px] h-fit w-[332px] rounded-[8px] bg-[#121423] p-[20px] md:bg-transparent md:p-0">
			<div className="grid grid-rows-[auto_1fr] gap-[12px]">
				<div className="flex flex-col">
					<span className="text-[16px] font-semibold">
						{t("generator_createdblock_title")}
					</span>
				</div>

				{isLoading && (
					// Показываем Loading, когда идет загрузка
					<div className="relative w-fit overflow-hidden rounded-[16px]">
						<Image
							src={LoadingImage}
							alt="sparkling starts"
							className="object-cover"
							width={143}
							height={181}
						/>

						<div className="pointer-events-none absolute inset-0 z-10 bg-black/5 backdrop-blur-[59px]" />

						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<Lottie
								className="bottom-0 left-0 right-0 top-0 z-10"
								animationData={SparklingAnimationLottie}
								height={40}
								width={40}
								loop={true}
								autoplay={true}
							/>
							<span className="z-10 text-center text-[18px] font-bold leading-[1.1] tracking-normal">
								{t("generator_loading_creating")} <br />{" "}
								{t("generator_loading_creating_image")}
							</span>
						</div>
					</div>
				)}

				{hasContent && !isLoading && (
					// Показываем ассеты из lastAssembledContent, если generatedAssets пусто
					<CreatedContent content={lastAssembledContent} />
				)}

				{shouldShowEmpty && (
					// Показываем Empty, когда ни generatedAssets, ни lastAssembledContent не доступны
					<div className="rounded-[24px] bg-[#191B2C] px-[20px] py-[16px] md:bg-[#121423]">
						<Image
							src="/images/img/image-empty-generated.png"
							alt="empty icon"
							width={80}
							height={80}
							className="mb-[8px]"
						/>
						<div className="flex flex-col">
							<span className="text-[16px] font-bold leading-[28px]">
								{t("generator_createdblock_empty")}
							</span>
							<span className="leading-1 align-middle text-[14px] font-medium opacity-50">
								{t("generator_createdblock_empty_desc")}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreatedBlock;
