"use client"

import { useState } from 'react';
import RandomButton from './RandomButton';
import TagsButton from './TagsButton';

const TAGS = [
	{
		id: 1,
		text: "Pose"
	},
	{
		id: 2,
		text: "Outfit"
	},
	{
		id: 3,
		text: "Action"
	},
	{
		id: 4,
		text: "Scene"
	},
	{
		id: 5,
		text: "Accessories"
	},
]

const CreateImageBlock = () => {
	const [activeTagId, setActiveTagId] = useState<number | null>(null);

	const handleTagClick = (tagId: number) => {
    	setActiveTagId(activeTagId === tagId ? null : tagId);
  	};


	return (
					<div>
				<div className="flex flex-col gap-[8px]">
					<div className="bg-[#121423] p-[20px] rounded-[8px] grid grid-rows-[1fr_auto] gap-[86px]">
						<div className="grid grid-rows-[auto_1fr] gap-[4px]">
							<span className="font-medium opacity-50 text-[14px]">Image description</span>
							<span className="font-medium text-[16px]">In a bar, wearing a tight leather outfit, looking at the viewer with a playful smirk. Lying on back</span>
						</div>
						<div className="flex flex-row justify-between">
							<div>check</div>
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
				</div>
			</div>
	)
}

export default CreateImageBlock;