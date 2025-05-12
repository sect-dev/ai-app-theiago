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
	const {type, setContentType, isLoading, generatedAssets} = useCharacterCreateStore()

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
						{isLoading ? (
			// Показываем Loading, когда идет загрузка
			<div className="bg-[#191B2C] rounded-[24px] px-[20px] py-[16px] flex items-center justify-center">
				<span className="text-[16px] font-bold">Loading...</span>
			</div>
			) : generatedAssets.length === 0 ? (
			// Показываем Empty, когда нет загрузки и нет ассетов
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
			) : (
			// Показываем ассеты, когда они есть
			<div>
				{generatedAssets.map((asset) => (
				<div key={asset.url}>
					<Image src={asset.url} alt="generated asset" width={100} height={100} />
					{asset.hasVideo && <button>generate video</button>}
				</div>
				))}
			</div>
			)}
				</div>
			</div>
	)
}

export default CreatedBlock;