"use client"

import { useEffect, useState } from 'react';
import RandomButton from './RandomButton';
import TagsButton from './TagsButton';
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import { STEPS } from '@/app/shared/consts/suggestions';
import Image from "next/image";
import SwitchButton from '@/app/shared/ui/Switch';
import { assembleRequest } from '@/app/shared/api/assembleRequest';
import { AssembledImageResponse } from '@/app/shared/api/types/assembleRequest';


type SuggestionKey = keyof typeof STEPS;

const TAGS = [
	{
		id: 1,
		text: "Pose",
    key: "pose" as SuggestionKey
	},
	{
		id: 2,
		text: "Outfit",
    key: "outfit" as SuggestionKey
	},
	{
		id: 3,
		text: "Action",
    key: "action" as SuggestionKey
	},
	{
		id: 4,
		text: "Scene",
    key: "scene" as SuggestionKey
	},
	{
		id: 5,
		text: "Accessories",
    key: "accessories" as SuggestionKey
	},
]

const CreateImageBlock = () => {
	const [activeTagId, setActiveTagId] = useState<number>(1);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [imagePaths, setImagePaths] = useState<string[]>([]);
	const { censorship, setRequest, request, characterId, type, setIsLoading, setGeneratedAssets, generatedAssets } = useCharacterCreateStore();

	
	// console.log("suggestions", suggestions)
	// console.log("request", request)
	// console.log("censorship", censorship)

		useEffect(() => {
		if (activeTagId) {
			const activeTag = TAGS.find(tag => tag.id === activeTagId);
			if (activeTag) {
				const tagSuggestions = STEPS[activeTag.key][censorship] || [];
				setSuggestions(tagSuggestions);

      if (activeTag.key === 'pose') {
        const images = STEPS.pose.images?.[censorship] || [];
        setImagePaths(images);
      } else {
        // Для других категорий используем заглушки или пустой массив
        setImagePaths([]);
      }
			}
		} else {
			setSuggestions([]);
		}
	}, [activeTagId, censorship]);

	const handleTagClick = (tagId: number) => {
    	setActiveTagId(tagId);
  	};

		const handleSuggestionClick = (suggestion: string) => {
		setRequest(suggestion);
	};

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
			<div>
				<div className="flex flex-col gap-[8px]">
					<div className="bg-[#121423] p-[20px] rounded-[8px] grid grid-rows-[1fr_auto] gap-[86px]">
						<div className="grid grid-rows-[auto_1fr] gap-[4px]">
							<span className="font-medium opacity-50 text-[14px]">Image description</span>
							<span className="font-medium text-[16px]">{request}</span>
						</div>
						<div className="flex flex-row justify-between">
							<SwitchButton />
							<RandomButton />
						</div>
					</div>
					<div className="bg-[#121423] p-[20px] rounded-[8px] grid grid-rows-2">
						<div className=''>
							<span className="block text-[16px] font-semibold mb-[12px]">Suggestions</span>
							<div className="flex gap-x-[4px]">
								{TAGS.map((tag) => (<TagsButton key={tag.id} isActive={activeTagId === tag.id} onClick={() => handleTagClick(tag.id)} text={tag.text} />))}
							</div>
						</div>
					</div>

					{activeTagId && suggestions.length > 0 && (
						<div className="bg-[#121423] p-[20px] rounded-[8px] mt-2">
							<div className="max-w-[411px] overflow-x-auto pb-4">
								<div className="flex gap-3 min-w-min">
									{suggestions.map((suggestion, index) => (
										<button 
											key={index} 
											className="relative rounded-lg overflow-hidden h-32 w-32 flex-shrink-0 cursor-pointer"
											onClick={() => handleSuggestionClick(suggestion)}
										>
											<Image
												src={imagePaths[index]}
												alt={suggestion}
												fill
												className="object-cover"
											/>
											<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white p-2">
												<span className="text-center text-sm font-medium">{suggestion}</span>
											</div>
										</button>
									))}
								</div>
							</div>
						</div>
					)}

					<button onClick={handleCreateImage}>
						generate
					</button>
				</div>
			</div>
	)
}

export default CreateImageBlock;