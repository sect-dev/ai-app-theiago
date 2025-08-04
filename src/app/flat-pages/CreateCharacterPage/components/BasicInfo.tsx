import Image from "next/image";
import SecondStep from "@/../public/images/createpage/second-step.png";
import StepBackButton from "./StepBackButton";
import clsx from "clsx";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import BasicInfoComponent from "./BasicInfoComponent";
import "swiper/css";
import "swiper/css/free-mode";
import AgeRangeSlider from "./AgeRangeSlider";

const GENDER_OPTIONS = [
	{
		id: 1,
		gender: "Female",
		icon: "/images/createpage/female-icon.png",
		has: true
	},
	{
		id: 2,
		gender: "Male",
		icon: "/images/createpage/male-icon.png",
		has: false
	},
	{
		id: 3,
		gender: "Transgender",
		icon: "/images/createpage/trans-icon.png",
		has: false
	}
];

const BasicInfo = () => {
	const { saveToStorage } = useLocalStorage();
	const {
		gender,
		setStep,
		ethnicity,
		bodyType,
		breastType,
		buttType,
		eyesType,
		hairStyle,
		hairColor,
		ageChar
	} = useGenerateImageStore();

	const handleNextClick = () => {
		setStep(3);
		saveToStorage({
			step: 3,
			gender,
			ethnicity,
			bodyType,
			breastType,
			buttType,
			eyesType,
			hairStyle,
			hairColor,
			age: ageChar
		});
	};

	return (
		<div>
			<div className="mb-[32px] flex flex-col text-center">
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
						Basic information
					</span>
					<span className="block text-[16px] font-medium opacity-50">
						Select the basic information about your character
					</span>
				</div>
				<div>
					<span className="traking-wide mb-[8px] block text-[18px] font-bold leading-[130%]">
						Gender
					</span>
					<div className="mb-[32px] grid grid-cols-3 items-center justify-center gap-[8px]">
						{GENDER_OPTIONS.map((gender) => (
							<div
								key={gender.id}
								className={clsx(
									"relative flex flex-col items-center justify-center rounded-[16px] bg-[#1D1F37] p-[20px]",
									gender.has === false && "opacity-20",
									gender.has === true &&
										"border-main-gradient choosen-token-shadow-generate"
								)}
							>
								<Image
									src={gender.icon}
									alt="gender-icon"
									width={24}
									height={24}
									className="mb-[4px]"
								/>
								<span className="text-[14px] font-semibold leading-[150%]">
									{gender.gender}
								</span>
							</div>
						))}
					</div>
				</div>

				<AgeRangeSlider />

				<BasicInfoComponent />
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

export default BasicInfo;
