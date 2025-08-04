import Image from "next/image";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import useRandomName from "../hooks/useRandomName";

const RandomNameButton = () => {
	const { setName } = useGenerateImageStore();
	const { fetchRandomName, isLoading } = useRandomName();

	const handleRandomClick = async () => {
		try {
			setName("reset");
			const newName = await fetchRandomName();
			if (newName) {
				setName(newName);
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

export default RandomNameButton;
