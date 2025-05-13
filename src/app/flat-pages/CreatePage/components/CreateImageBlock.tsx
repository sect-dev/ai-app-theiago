"use client"

import { useEffect, useState } from 'react';
import RandomButton from './RandomButton';
import TagsButton from './TagsButton';
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import { STEPS } from '@/app/shared/consts/suggestions';

import SwitchButton from '@/app/shared/ui/Switch';
import { assembleRequest } from '@/app/shared/api/assembleRequest';
import { AssembledImageResponse } from '@/app/shared/api/types/assembleRequest';

import SuggestionsBlock from './SuggestionsBlock';
import TextArea from './TextArea';

const CreateImageBlock = () => {
	const { censorship, setRequest, request, characterId, type, setIsLoading, setGeneratedAssets, generatedAssets } = useCharacterCreateStore();

	console.log("rerender")

	console.log("requset", request)
		
	const handleCreateImage = async () => {
		try {
			setIsLoading(true);

			const response = await assembleRequest<AssembledImageResponse>({
			type: type,
			characterId: characterId !== null ? characterId : 1,
			request: request,
			censorship: censorship
		  })

		  if (response) {
			
			const newAsset = {
				url: response.url,
				nsfw: response.nsfw,
				hasVideo: response.has_video
			}

			setGeneratedAssets([...generatedAssets, newAsset])
		  }

		console.log("response", response)
		} catch (error) {
			console.error("Error creating image:", error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
			<div className="min-w-[411px] xs:min-w-full">
				<div className="flex flex-col gap-[8px]">
					<div className="bg-[#121423] p-[20px] rounded-[8px] grid grid-rows-[1fr_auto] gap-[86px]">
						<TextArea />
						<div className="flex flex-row justify-between">
							<SwitchButton />
							<RandomButton />
						</div>
					</div>
					
					<SuggestionsBlock />

					<button onClick={handleCreateImage} className="main-gradient mb-[8px] flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] disabled:pointer-events-none disabled:opacity-50">
						<span className="relative z-[5] text-[15px] font-bold">Create Image</span>
					</button>
				</div>
			</div>
	)
}

export default CreateImageBlock;