"use client"

import Image from "next/image";
import TagsButton from './TagsButton';
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import { useEffect, useState } from 'react';
import { lastAssembledRequest } from '@/app/shared/api/assembleRequest';
import { LastAssembledContentResponse } from '@/app/shared/api/types/assembleRequest';
import { Character } from '@/app/shared/api/types';
import CreatedContent from './CreatedContent';
import Lottie from "lottie-react";
import SparklingAnimationLottie from "@/../public/lotties/sparkling-starts-lottie.json"
import LoadingImage from "@/../public/images/img/image-loading-generator.png"

interface Tag {
	id: number,
	text: string,
	type: "image" | "video"
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
	const {isLoading, generatedAssets, characterId} = useCharacterCreateStore()
	const [lastAssembledContent, setLastAssembledContent] = useState<LastAssembledContentResponse[] | null>(null);

  console.log("generatedAssets", generatedAssets)

	const fetchContent = async (contentType: "image") => {
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

		fetchContent("image")
	}, [characterId, generatedAssets])


	return (
		<div className="bg-[#121423] xs:p-0 xs:bg-transparent p-[20px]  h-fit rounded-[8px] min-w-[332px] max-w-[332px]">
				<div className='grid grid-rows-[auto_1fr] gap-[12px]'>
						<div className="flex flex-col">
							<span className="text-[16px] font-semibold">Created</span>
						</div>
            

						{isLoading ? (
        // Показываем Loading, когда идет загрузка
<div className="w-fit relative rounded-[16px] overflow-hidden">
              <Image src={LoadingImage} alt="sparkling starts" className="object-cover" width={143} height={181} />

              <div className="absolute inset-0 bg-black/5 backdrop-blur-[59px]  z-10 pointer-events-none" />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                
                <Lottie 
              className="z-10 top-0 left-0 right-0 bottom-0"
	    animationData={SparklingAnimationLottie}
        height={40}
        width={40} 
        loop={true}
        autoplay={true}
      />
      <span className="text-[18px] leading-[1.1] tracking-normal font-bold z-10 text-center">Creating <br /> Image</span>
              </div>


            </div>
      ) : lastAssembledContent && lastAssembledContent.length > 0 ? (
        // Показываем ассеты из lastAssembledContent, если generatedAssets пусто
        <CreatedContent content={lastAssembledContent} />
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
            <span className="text-[16px] font-bold leading-[28px]">It&apos;s empty here for now</span>
            <span className="text-[14px] font-medium opacity-50 leading-1 align-middle">Later, all the created content will appear here</span>
          </div>
        </div>
      )}
				</div>
			</div>
	)
}

export default CreatedBlock;