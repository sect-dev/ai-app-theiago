import Image from "next/image";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import { generateRandomPrompt } from "@/app/shared/api/assembleRequest";

const RandomButton = () => {
	const { characterId, setRequest } = useGenerateImageStore();

	const handleRandomClick = async () => {
		const randomPrompt = await generateRandomPrompt({
			characterId: characterId || 0
		});

		if (randomPrompt) {
			setRequest("reset");
			setRequest(randomPrompt);
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

export default RandomButton;
