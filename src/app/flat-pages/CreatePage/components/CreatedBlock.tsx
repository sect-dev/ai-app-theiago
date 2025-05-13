"use client"

import Image from "next/image";
import TagsButton from './TagsButton';
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import { useEffect, useState } from 'react';
import { lastAssembledRequest } from '@/app/shared/api/assembleRequest';
import { LastAssembledContentResponse } from '@/app/shared/api/types/assembleRequest';
import { Character } from '@/app/shared/api/types';
interface Tag {
	id: number,
	text: string,
	type: "image" | "video"
}

const IMAGES_VIDEOS: Tag[] = [
	{
		id: 1,
		text: "Images",
		type: "image"
	},
	{
		id: 2,
		text: "Videos",
		type: "video",
	}
]

const CreatedBlock = () => {
	const {isLoading, generatedAssets, characterId} = useCharacterCreateStore()
    const [contentType, setContentType] = useState<"image" | "video">("image");
	const [lastAssembledContent, setLastAssembledContent] = useState<LastAssembledContentResponse[] | null>(null);

	const fetchContent = async (contentType: "image" | "video") => {
        if (!characterId) return;

		try {
            const response = await lastAssembledRequest({
                type: contentType,
                characterId: characterId
            })

			if (response) {
				setLastAssembledContent(response)
			}
		} catch (error) {
			console.log("error fetching content", error)
		}
	}	

	useEffect(() => {
		fetchContent(contentType)
	}, [contentType, characterId])


	return (
		<div className="bg-[#121423] p-[20px] w-full h-fit rounded-[8px]">
				<div className='grid grid-rows-[auto_1fr] gap-[16px]'>
						<div className="flex flex-col">
							<span className="text-[16px] font-semibold mb-[12px]">Created</span>
							<div className="flex gap-x-[4px]">
								{IMAGES_VIDEOS.map((tag) => (<TagsButton key={tag.id} onClick={() => setContentType(tag.type)} isActive={contentType === tag.type} text={tag.text} />))}
							</div>
						</div>
						{isLoading ? (
        // Показываем Loading, когда идет загрузка
        <div className="bg-[#191B2C] rounded-[24px] px-[20px] py-[16px] flex items-center justify-center">
          <span className="text-[16px] font-bold">Loading...</span>
        </div>
      ) : generatedAssets.length > 0 ? (
        // Показываем ассеты из generatedAssets, когда они есть
        <div className="grid grid-cols-3 gap-3">
          {generatedAssets.map((asset) => (
            <div key={asset.url} className="relative rounded-lg overflow-hidden h-32 w-full">
              <Image src={asset.url} alt="generated asset" fill className="object-cover" />
              {asset.hasVideo && (
                <button className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  generate video
                </button>
              )}
            </div>
          ))}
        </div>
      ) : lastAssembledContent && lastAssembledContent.length > 0 ? (
        // Показываем ассеты из lastAssembledContent, если generatedAssets пусто
        <div className="grid grid-cols-3 gap-3">
          {lastAssembledContent.map((item, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden h-32 w-full">
              <Image src={item.url} alt="assembled content" fill className="object-cover" />
            </div>
          ))}
        </div>
      ) : (
        // Показываем Empty, когда ни generatedAssets, ни lastAssembledContent не доступны
        <div className="bg-[#191B2C] rounded-[24px] px-[20px] py-[16px]">
          <Image
            src="/images/img/image-empty-generated.png"
            alt="empty icon"
            width={80}
            height={80}
            className="mb-[8px]"
          />
          <div className='flex flex-col'>
            <span className="text-[16px] font-bold">It&apos;s empty here for now</span>
            <span className="text-[14px] font-medium opacity-50">Later, all the created content will<br />appear here</span>
          </div>
        </div>
      )}
				</div>
			</div>
	)
}

export default CreatedBlock;