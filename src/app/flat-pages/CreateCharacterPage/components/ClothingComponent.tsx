import { useState } from "react";
import useGetSuggestions from "../hooks/useGetSuggestions";
import Image from "next/image";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import clsx from "clsx";
import { auth } from "@/firebase";
import ClothingComponentSkeleton from "./ClothingComponentSkeleton";

interface SuggestionItem {
	id: string;
	type: string;
	label: string;
	image: string;
	isSelected?: boolean;
	onSelect?: () => void;
}

type TabType = "outfit" | "accessories";

const ClothingComponent = () => {
	const { data, isLoading, error } = useGetSuggestions();
	const [activeTab, setActiveTab] = useState<TabType>("outfit");

	const { outfit, accessories, setOutfit, setAccessories } =
		useGenerateImageStore();

	console.log("accessories:: ", accessories, "outfit:: ", outfit);

	const filteredData = data.filter((item) => item.type === activeTab);

	if (isLoading) {
		return <ClothingComponentSkeleton />;
	}

	const handleItemSelect = (item: SuggestionItem) => {
		switch (item.type) {
			case "outfit":
				setOutfit(item.id);
				break;
			case "accessories":
				setAccessories(item.id);
				break;
			default:
				break;
		}
	};

	const isItemSelected = (item: SuggestionItem) => {
		switch (item.type) {
			case "outfit":
				return outfit === item.id;
			case "accessories":
				return accessories === item.id;
			default:
				return false;
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8">
				<span className="text-gray-500">Loading...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center p-8">
				<span className="text-red-500">Error: {error}</span>
			</div>
		);
	}

	console.log(data);

	return (
		<div>
			<span className="mb-[12px] block text-[16px] font-semibold">
				Clothing
			</span>

			{/* Табы */}
			<div className="mb-[16px] flex items-center justify-center gap-[8px]">
				<button
					onClick={() => setActiveTab("outfit")}
					className={clsx(
						"rounded-[12px] px-[12px] py-[6px] text-[12px] font-semibold leading-[150%] transition-colors",
						activeTab === "outfit"
							? "bg-[#003B5F] text-[#0394EC]" // Активный стиль
							: "text-gray-300 bg-[#1D1F37] hover:bg-[#2A2D4A]" // Неактивный стиль
					)}
				>
					Outfit
				</button>
				<button
					onClick={() => setActiveTab("accessories")}
					className={clsx(
						"rounded-[12px] px-[12px] py-[6px] text-[12px] font-semibold leading-[150%] transition-colors",
						activeTab === "accessories"
							? "bg-[#003B5F] text-[#0394EC]" // Активный стиль
							: "text-gray-300 bg-[#1D1F37] hover:bg-[#2A2D4A]" // Неактивный стиль
					)}
				>
					Accessories
				</button>
			</div>

			{/* Отфильтрованные элементы */}
			<div className="custom-x-scrollbar relative mb-[32px] flex w-full overflow-x-auto overflow-y-hidden">
				<div className="flex gap-[12px] pb-4">
					{filteredData.length > 0 ? (
						filteredData.map((item) => (
							<ClothingItem
								key={item.id}
								{...item}
								isSelected={isItemSelected(item)}
								onSelect={() => handleItemSelect(item)}
							/>
						))
					) : (
						<div className="text-gray-500 w-full py-8 text-center">
							No {activeTab} items found
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const ClothingItem = (props: SuggestionItem) => {
	const { id, type, label, image, isSelected, onSelect } = props;

	return (
		<div
			onClick={onSelect}
			className={clsx(
				"inner-shadow relative max-h-[114px] min-h-[114px] min-w-[94px] max-w-[94px] cursor-pointer overflow-hidden rounded-[16px] transition-all duration-100",
				isSelected ? "choosen-token-shadow-generate border-main-gradient" : ""
			)}
		>
			<Image
				src={image}
				alt={label}
				width={100}
				height={100}
				className="relative object-cover"
			/>
			<div className="absolute bottom-0 left-0 right-0 z-[1] mb-[8px] text-[12px] font-bold">
				{label}
			</div>
		</div>
	);
};

export default ClothingComponent;
