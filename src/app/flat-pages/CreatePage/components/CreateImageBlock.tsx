"use client";

import { useEffect, useState } from "react";
import RandomButton from "./RandomButton";
import TagsButton from "./TagsButton";
import { useCharacterCreateStore } from "@/app/shared/store/createCharacterStore";
import { STEPS } from "@/app/shared/consts/suggestions";

import SwitchButton from "@/app/shared/ui/Switch";
import { assembleRequest } from "@/app/shared/api/assembleRequest";
import { AssembledImageResponse } from "@/app/shared/api/types/assembleRequest";

import SuggestionsBlock from "./SuggestionsBlock";
import TextArea from "./TextArea";

const CENSORSHIP_LOW = "low";

const CreateImageBlock = () => {
	const {
		setRequest,
		request,
		characterId,
		type,
		setIsLoading,
		setGeneratedAssets,
		generatedAssets,
		setIsGenerateModalActive,
		setRecentlyGeneratedImage
	} = useCharacterCreateStore();

	const handleFixedCreateImage = async () => {
		try {
			setIsGenerateModalActive(true);
			setIsLoading(true);

			const response = await assembleRequest<AssembledImageResponse>({
				type: type,
				characterId: characterId !== null ? characterId : 1,
				request: request,
				censorship: CENSORSHIP_LOW
			});

			if (response) {
				const newAsset = {
					url: response.url,
					nsfw: response.nsfw,
					hasVideo: response.has_video
				};

				setRecentlyGeneratedImage(newAsset.url);
				setGeneratedAssets([...generatedAssets, newAsset]);
			}

			// console.log("response", response);
		} catch (error) {
			console.error("Error creating image:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCreateImage = async () => {
		try {
			setIsLoading(true);

			const response = await assembleRequest<AssembledImageResponse>({
				type: type,
				characterId: characterId !== null ? characterId : 1,
				request: request,
				censorship: CENSORSHIP_LOW
			});

			if (response) {
				const newAsset = {
					url: response.url,
					nsfw: response.nsfw,
					hasVideo: response.has_video
				};

				setGeneratedAssets([...generatedAssets, newAsset]);
			}

			console.log("response", response);
		} catch (error) {
			console.error("Error creating image:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="min-w-[411px] xs:min-w-full">
				<div className="flex flex-col">
					<div className="mb-[16px] grid grid-rows-[1fr_auto] gap-[12px] rounded-[8px] bg-[#121423] p-[20px] xs:rounded-[16px]">
						<TextArea />
						<div className="flex flex-row justify-between">
							{/* <SwitchButton /> */}
							<RandomButton />
						</div>
					</div>

					<SuggestionsBlock />

					<button
						onClick={handleCreateImage}
						className="relative mb-[8px] flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50 xs:hidden"
					>
						<span className="relative z-[5] text-[15px] font-bold">
							Create Image
						</span>
						<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
					</button>
				</div>
			</div>

			<div className="fixed bottom-[5vw] left-1/2 z-[50] hidden -translate-x-1/2 xs:block">
				<button
					onClick={handleFixedCreateImage}
					className="relative flex h-[60px] w-[343px] items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50"
				>
					<span className="relative z-[5] text-[15px] font-bold">
						Create Image
					</span>
					<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
				</button>
			</div>
		</>
	);
};

export default CreateImageBlock;
