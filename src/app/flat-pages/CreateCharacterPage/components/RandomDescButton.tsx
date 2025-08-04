import Image from "next/image";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import useRandomDesc from "../hooks/useRandomDesc";

const RandomDescButton = () => {
	const { relationship, setRelationship } = useGenerateImageStore();
	const { fetchRandomDesc, isLoading } = useRandomDesc();

	const handleRandomClick = async () => {
		try {
			setRelationship("reset");
			const newDesc = await fetchRandomDesc();
			if (newDesc) {
				setRelationship(newDesc);
			}
		} catch (err) {
			console.error("Failed to fetch random name:", err);
		}
	};

	return (
		<button
			onClick={handleRandomClick}
			className="flex items-center justify-center gap-[4px] rounded-[16px] bg-[#003B5F] px-[8px] py-[2px]"
		>
			<Image
				src="/images/icons/icon-random-button.svg"
				width={24}
				height={24}
				alt="change button"
			/>
			<span className="text-[14px] font-medium text-[#0394EC]">Random</span>
		</button>
	);
};

export default RandomDescButton;
