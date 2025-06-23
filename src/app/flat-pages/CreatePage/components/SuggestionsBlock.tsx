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
	const { censorship, setRequest } = useCharacterCreateStore();


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




	return (
		<div className="bg-[#121423] p-[20px] rounded-[8px] relative">
						<div className=''>
							<span className="block text-[16px] font-semibold mb-[12px]">Suggestions</span>
							<div className="flex gap-x-[4px] mb-[16px]">
								{TAGS.map((tag) => (<TagsButton key={tag.id} isActive={activeTagId === tag.id} onClick={() => handleTagClick(tag.id)} text={tag.text} />))}
							</div>


							{activeTagId && suggestions.length > 0 && (
  <div className="relative w-full overflow-x-auto custom-x-scrollbar">
    <div className="pb-4">
      <div className="flex gap-3">
        {suggestions.map((suggestion, index) => (
          <button 
            key={index} 
            className="relative rounded-lg overflow-hidden h-[114px] w-[94px] flex-shrink-0 cursor-pointer"
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
							

						
						</div>
					</div>
	)
}

export default SuggestionsBlock;