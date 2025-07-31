import { STEPS } from "@/app/shared/consts/suggestions";
import { useGenerateImageStore } from "@/app/shared/store/generateImageStore";
import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import TagsButton from "./TagsButton";
import clsx from "clsx";
import CheckIcon from "@/../public/images/img/blue-check-mark.png";
import { useTranslations } from "next-intl";

type SuggestionKey = keyof typeof STEPS;

const SuggestionsBlock = () => {
	const [activeTagId, setActiveTagId] = useState<number>(1);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [imagePaths, setImagePaths] = useState<string[]>([]);
	const [clickedIndex, setClickedIndex] = useState<number | null>(null);
	const { setRequest } = useGenerateImageStore();
	const t = useTranslations("ImageGenerator");

	const TAGS = [
		{
			id: 1,
			text: t("generator_pose"),
			key: "pose" as SuggestionKey
		},
		{
			id: 2,
			text: t("generator_outfit"),
			key: "outfit" as SuggestionKey
		},
		{
			id: 3,
			text: t("generator_action"),
			key: "action" as SuggestionKey
		},
		{
			id: 4,
			text: t("generator_scene"),
			key: "scene" as SuggestionKey
		},
		{
			id: 5,
			text: t("generator_accessories"),
			key: "accessories" as SuggestionKey
		}
	];

	useEffect(() => {
		if (activeTagId) {
			const activeTag = TAGS.find((tag) => tag.id === activeTagId);
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

	const handleSuggestionClick = (suggestion: string, index: number) => {
		setRequest(suggestion);
		setClickedIndex(index);

		setTimeout(() => {
			setClickedIndex(null);
		}, 300);
	};

	return (
		<div className="relative mb-[20px] rounded-[8px] bg-[#121423] p-[20px] xs:mb-[12px] xs:bg-transparent xs:p-0">
			<div className="">
				<span className="mb-[12px] block text-[16px] font-semibold">
					{t("generator_suggestions")}
				</span>
				<div className="custom-x-scrollbar mb-[16px] flex gap-x-[4px] overflow-x-auto">
					{TAGS.map((tag) => (
						<TagsButton
							key={tag.id}
							isActive={activeTagId === tag.id}
							onClick={() => handleTagClick(tag.id)}
							text={tag.text}
						/>
					))}
				</div>

				{activeTagId && suggestions.length > 0 && (
					<div className="custom-x-scrollbar relative w-full overflow-x-auto">
						<div className="pb-4">
							<div className="flex gap-3">
								{suggestions.map((suggestion, index) => (
									<button
										key={index}
										className={clsx(
											"relative h-[114px] w-[94px] flex-shrink-0 cursor-pointer rounded-[16px] bg-[#121423] transition-all duration-300 ease-in-out",
											{
												"border-main-gradient choosen-token-shadow-generate":
													clickedIndex === index
											}
										)}
										onClick={() => handleSuggestionClick(suggestion, index)}
									>
										<Image
											src={imagePaths[index]}
											alt={suggestion}
											fill
											className="object-cover"
										/>

										{clickedIndex === index && (
											<div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out">
												<div className="relative h-[24px] w-[36px] rounded-[16px] bg-[#003B5F]"></div>
												<Image
													src={CheckIcon}
													alt="check"
													width={24}
													height={24}
													className="absolute h-[20px] w-[20px]"
												/>
											</div>
										)}
									</button>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SuggestionsBlock;
