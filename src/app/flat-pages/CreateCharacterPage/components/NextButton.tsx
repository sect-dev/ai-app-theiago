import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import useLocalStorage from "../hooks/useLocalStorage";

interface Props {
	key: string;
	value: string;
}

const NextButton = (props: Props) => {
	const { key, value } = props;
	const { step, setStep } = useGenerateImageStore();
	const { saveToStorage } = useLocalStorage();

	const handleNextClick = () => {
		setStep(step + 1);
		saveToStorage({ step: step + 1 });
	};

	return (
		<div className="flex justify-center">
			<button
				onClick={handleNextClick}
				className="relative flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50"
			>
				<span className="relative z-[5] text-[15px] font-bold">Next</span>
				<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
			</button>
		</div>
	);
};

export default NextButton;
