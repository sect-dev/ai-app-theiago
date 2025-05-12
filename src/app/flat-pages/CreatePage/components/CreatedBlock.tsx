"use client"

import Image from "next/image";
import TagsButton from './TagsButton';
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';

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
	const {type, setContentType, isLoading} = useCharacterCreateStore()

	// TODO: убрать, тип не должен меняться кнопкой. Сначала запрос image всегда
	const handleTagTypeClick = (tagType: "image" | "video") => {
		setContentType(tagType);
	};



	return (
		<div className="bg-[#121423] p-[20px] w-full h-fit rounded-[8px]">
				<div className='grid grid-rows-[auto_1fr] gap-[16px]'>
						<div className="flex flex-col">
							<span className="text-[16px] font-semibold mb-[12px]">Created</span>
							<div className="flex gap-x-[4px]">
								{IMAGES_VIDEOS.map((tag) => (<TagsButton key={tag.id} isActive={type === tag.type} onClick={() => handleTagTypeClick(tag.type)} text={tag.text} />))}
							</div>
						</div>
						<div className="bg-[#191B2C] rounded-[24px] px-[20px] py-[16px]">
							<Image
								src="/images/img/image-empty-generated.png"
								alt="empty icon"
								width={80}
								height={80}
								className="mb-[8px]"
							/>
							{isLoading ? (
								<div className="flex flex-col">
									<span className="text-[16px] font-bold">Loading...</span>
									<span className="text-[14px] font-medium opacity-50">Please wait while we generate the content</span>
								</div>
							) : (
							<div className='flex flex-col'>
								<span className="text-[16px] font-bold">It&apos;s empty here for now</span>
								<span className="text-[14px] font-medium opacity-50">Later, all the created content will<br />appear here</span>
							</div>)}
						</div>
				</div>
			</div>
	)
}

export default CreatedBlock;