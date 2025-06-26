import { STEPS } from '@/app/shared/consts/suggestions';
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
import { useState } from 'react';
import Image from "next/image";
import { useEffect } from 'react';
import TagsButton from './TagsButton';

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

const SuggestionsBlock = () => {
		const [activeTagId, setActiveTagId] = useState<number>(1);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [imagePaths, setImagePaths] = useState<string[]>([]);
	const { setRequest } = useCharacterCreateStore();


useEffect(() => {
		if (activeTagId) {
			const activeTag = TAGS.find(tag => tag.id === activeTagId);
			if (activeTag) {
				const categoryData = STEPS[activeTag.key];
				const tagSuggestions = categoryData.suggestions || [];
				setSuggestions(tagSuggestions);

      if (categoryData.images) {
        setImagePaths(categoryData.images);
      } else {
        // Для других категорий используем заглушки или пустой массив
        setImagePaths([]);
      }
			}
		} else {
			setSuggestions([]);
			setImagePaths([]);
		}
	}, [activeTagId]);






	const handleTagClick = (tagId: number) => {
    	setActiveTagId(tagId);
  	};

		const handleSuggestionClick = (suggestion: string) => {
		setRequest(suggestion);
	};




	return (
		<div className="xs:bg-transparent xs:p-0 bg-[#121423] p-[20px] rounded-[8px] relative mb-[20px] xs:mb-[12px]">
						<div className=''>
							<span className="block text-[16px] font-semibold mb-[12px]">Suggestions</span>
							<div className="flex gap-x-[4px] mb-[16px] overflow-x-auto custom-x-scrollbar">
								{TAGS.map((tag) => (<TagsButton key={tag.id} isActive={activeTagId === tag.id} onClick={() => handleTagClick(tag.id)} text={tag.text} />))}
							</div>


							{activeTagId && suggestions.length > 0 && (
  <div className="relative w-full overflow-x-auto custom-x-scrollbar">
    <div className="pb-4">
      <div className="flex gap-3">
        {suggestions.map((suggestion, index) => (
          <button 
            key={index} 
            className="relative rounded-[16px] overflow-hidden h-[114px] w-[94px] flex-shrink-0 cursor-pointer"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <Image
              src={imagePaths[index]}
              alt={suggestion}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  </div>
)}
							

						
						</div>
					</div>
	)
}

export default SuggestionsBlock;