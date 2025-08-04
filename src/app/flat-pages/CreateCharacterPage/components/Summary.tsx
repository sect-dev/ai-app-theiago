import Image from "next/image";
import StepBackButton from "./StepBackButton";
import FourthStep from "@/../public/images/createpage/fourth-step.png";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import useAddCharacter from "../hooks/useAddCharacter";
import FemaleIcon from "@/../public/images/createpage/female-icon.png";
import AgeIcon from "@/../public/images/createpage/age-icon.png";
import SummarySlider from "./SummarySlider";

const Summary = () => {
	const { saveToStorage, clearStorage } = useLocalStorage();
	const { gender, setStep } = useGenerateImageStore();
	const { data, isLoading, error, addCharacter } = useAddCharacter();
	console.log("summary", data);

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
						src={FourthStep.src}
						width={FourthStep.width / 2}
						height={FourthStep.height / 2}
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

				<div className="mb-[32px] grid grid-cols-2 gap-[12px]">
					<div className="flex items-center justify-between rounded-[16px] bg-[#1D1F37] px-[16px] py-[12px]">
						<div className="flex flex-col items-start gap-[8px]">
							<span className="block text-[16px] font-semibold leading-[150%] opacity-50">
								Gender
							</span>
							<span className="block text-[16px] font-medium">Female</span>
						</div>

						<Image
							src={FemaleIcon.src}
							alt="gender"
							width={32}
							height={32}
							className="object-cover"
						/>
					</div>

					<div className="flex items-center justify-between rounded-[16px] bg-[#1D1F37] px-[16px] py-[12px]">
						<div className="flex flex-col items-start gap-[8px]">
							<span className="block text-[16px] font-semibold leading-[150%] opacity-50">
								Age
							</span>
							<span className="block text-[16px] font-medium">20</span>
						</div>

						<Image
							src={AgeIcon.src}
							alt="age"
							width={32}
							height={32}
							className="object-cover"
						/>
					</div>
				</div>

				<SummarySlider />

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
