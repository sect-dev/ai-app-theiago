import StepBackButton from "./StepBackButton";
import FourthStep from "@/../public/images/createpage/fourth-step.png";
import Image from "next/image";
import { HOBBIES_OPTIONS, HobbiesOptionType } from "../consts";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import useLocalStorage from "../hooks/useLocalStorage";
import clsx from "clsx";
import { useEffect } from "react";

const Additional = () => {
	const { saveToStorage, getStoredData } = useLocalStorage();
	const { setStep, hobbies, setHobbies } = useGenerateImageStore();

	useEffect(() => {
		const storedData = getStoredData();
		const initialHobbies = storedData.hobbies || [];
		setHobbies(initialHobbies);
	}, [getStoredData, setHobbies]);

	const handleHobbyClick = (hobby: string) => {
		if (hobbies.includes(hobby)) {
			setHobbies(hobbies.filter((h) => h !== hobby));
		} else {
			setHobbies([...hobbies, hobby]);
		}
	};

	const handleNextClick = () => {
		setStep(5);
		saveToStorage({ step: 5, hobbies });
	};

	return (
		<div>
			<div className="mb-[32px] flex flex-col text-center">
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
						Additional
					</span>
					<span className="block text-[16px] font-medium opacity-50">
						Voice, occupation and hobbies
					</span>
				</div>

				<div className="mb-[32px]">
					<span className="mb-[8px] block text-[18px] font-bold leading-[130%] tracking-wide">
						Hobbies
					</span>
					<div className="flex flex-wrap justify-center gap-[12px]">
						{HOBBIES_OPTIONS.map((option: HobbiesOptionType) => (
							<button
								key={option.id}
								className={clsx(
									"w-fit rounded-[16px] bg-[#1D1F37] px-[16px] py-[10px]",
									hobbies.includes(option.text) && "bg-[#2D304E]"
								)}
								onClick={() => handleHobbyClick(option.text)}
							>
								<div className="flex items-center justify-center gap-[12px]">
									<Image
										src={option.icon}
										alt="hobby-icon"
										width={24}
										height={24}
									/>
									<span className="text-[16px] font-semibold leading-[22px] tracking-[-0.41px]">
										{option.text}
									</span>
								</div>
							</button>
						))}
					</div>
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

export default Additional;
