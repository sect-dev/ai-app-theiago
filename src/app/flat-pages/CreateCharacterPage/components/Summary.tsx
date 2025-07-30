import Image from "next/image";
import SecondStep from "@/../public/images/createpage/second-step.png";
import StepBackButton from "./StepBackButton";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";

const Summary = () => {
	const { saveToStorage, clearStorage } = useLocalStorage();
	const { gender, setStep } = useGenerateImageStore();

	const handleMakeItRealClick = () => {
		console.log("make it real");
	};

	const handleCreateAnotherClick = () => {
		clearStorage();
		setStep(1);
	};

	return (
		<div>
			<div className="flex flex-col text-center">
				<div className="mb-[32px] flex sm:mb-[22px]">
					<StepBackButton />
					<Image
						src={SecondStep.src}
						width={SecondStep.width}
						height={SecondStep.height}
						alt="second-page-header"
						className="absolute right-0 h-[32px] object-cover object-left sm:max-w-[340px] xs:max-w-[300px]"
					/>
				</div>
				<div className="mb-[32px]">
					<span className="block text-[24px] font-bold leading-[1.3]">
						Summary
					</span>
					<span className="block text-[16px] font-medium opacity-50">
						Your girl is almost ready
					</span>
				</div>

				<div className="mb-[20px]">
					<span className="traking-wide mb-[12px] block text-[18px] font-bold leading-[130%]">
						Girlname
					</span>
					<span className="text-[16px] font-medium">
						In a bar, wearing a tight leather outfit, looking at the viewer with
						a playful smirk. Lying on back
					</span>
				</div>

				{/* TODO: вынести в NextButton */}
				<div className="flex flex-col justify-center gap-[16px]">
					<button
						onClick={handleMakeItRealClick}
						className="relative flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50"
					>
						<span className="relative z-[5] text-[15px] font-bold">
							Make it real
						</span>
						<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
					</button>

					<button
						onClick={handleCreateAnotherClick}
						className="bg-red-text-gradient bg-clip-text text-[14px] font-bold text-transparent"
					>
						Create another
					</button>
				</div>
			</div>
		</div>
	);
};

export default Summary;
