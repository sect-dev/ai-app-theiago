import StepBackButton from "./StepBackButton";
import Image from "next/image";
import ThirdStep from "@/../public/images/createpage/third-step.png";
import { OptionType, PERSONALITY_OPTIONS } from "../consts";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import { useEffect } from "react";
import clsx from "clsx";

const SetUpPersonality = () => {
	const { saveToStorage, getStoredData } = useLocalStorage();
	const { personality, setPersonality, setStep } = useGenerateImageStore();

	useEffect(() => {
		const storedData = getStoredData();
		const initialPersonality = storedData.personality || "Protector";
		setPersonality(initialPersonality);
	}, [getStoredData, setPersonality]);

	const handlePersonalitySelect = (personality: string) => {
		setPersonality(personality);
	};

	const handleNextClick = () => {
		saveToStorage({ step: 4, personality });
		setStep(4);
	};

	return (
		<div>
			<div className="mb-[32px] flex flex-col text-center">
				<div className="mb-[32px] flex sm:mb-[22px]">
					<StepBackButton />
					<Image
						src={ThirdStep.src}
						width={ThirdStep.width / 2}
						height={ThirdStep.height / 2}
						alt="second-page-header"
						className="absolute right-0 h-[32px] object-cover object-left sm:max-w-[340px] xs:max-w-[300px]"
					/>
				</div>
				<div className="mb-[32px]">
					<span className="block text-[24px] font-bold leading-[1.3]">
						Set up Personality
					</span>
					<span className="block text-[16px] font-medium opacity-50">
						Choose your character&apos;s behavior settings
					</span>
				</div>
				<div className="mb-[32px] flex flex-col gap-[12px]">
					{PERSONALITY_OPTIONS.map((option: OptionType) => (
						<button
							key={option.id}
							onClick={() => handlePersonalitySelect(option.title)}
							className={clsx(
								"flex max-h-[80px] items-center gap-[12px] rounded-[16px] bg-[#1D1F37] p-[12px]",
								personality === option.title && "bg-red-500"
							)}
						>
							<div className="flex min-h-[42px] min-w-[42px] items-center justify-center rounded-[12px] bg-[#121423] px-[9px] py-[3px]">
								<Image
									src={option.icon}
									alt="personality-icon"
									width={24}
									height={24}
								/>
							</div>
							<div className="flex flex-col text-left">
								<span className="text-[16px] font-semibold leading-[150%]">
									{option.title}
								</span>
								<span className="text-[12px] font-medium opacity-50">
									{option.description}
								</span>
							</div>
						</button>
					))}
				</div>

				{/* TODO: вынести в NextButton */}
				<div className="flex justify-center">
					<button
						onClick={handleNextClick}
						className="relative flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] bg-blue-button-gradient shadow-blue-shadow disabled:pointer-events-none disabled:opacity-50"
					>
						<span className="relative z-[5] text-[15px] font-bold">Next</span>
						<span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SetUpPersonality;
