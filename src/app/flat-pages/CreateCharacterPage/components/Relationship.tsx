import Image from "next/image";
import SecondStep from "@/../public/images/createpage/second-step.png";
import StepBackButton from "./StepBackButton";
import RandomButton from "../../CreatePage/components/RandomButton";
import TextAreaName from "./Textarea";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import useLocalStorage from "../hooks/useLocalStorage";
import TextAreaDesc from "./TextareaDesc";

const RELATIONSHIP_OPTIONS = [
	{
		id: 1,
		text: "Girl-Next-Door"
	},
	{
		id: 2,
		text: "Colleague"
	},
	{
		id: 3,
		text: "Classmate"
	},
	{
		id: 4,
		text: "Best Friend"
	},
	{
		id: 5,
		text: "Neighbor"
	},
	{
		id: 6,
		text: "Teammate"
	},
	{
		id: 7,
		text: "Sibling"
	},
	{
		id: 8,
		text: "Mentor"
	},
	{
		id: 9,
		text: "Roommate"
	},
	{
		id: 10,
		text: "Acquaintance"
	}
];

const Relationship = () => {
	const { name, setStep, relationship, setRelationship } =
		useGenerateImageStore();
	const { saveToStorage } = useLocalStorage();

	const handleAddRelationship = (text: string) => {
		setRelationship(text);
	};

	const handleNextClick = () => {
		setStep(6);
		saveToStorage({ step: 6, name, relationship });
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
						Relationships
					</span>
					<span className="block text-[16px] font-medium opacity-50">
						Describe your relationship with her
					</span>
				</div>

				<div className="mb-[32px] rounded-[16px] bg-[#1D1F37] p-[12px]">
					<div className="flex items-center justify-between">
						<div>
							<TextAreaName />
						</div>
						<div className="max-h-[28px]">
							<RandomButton />
						</div>
					</div>
				</div>

				<div className="mb-[32px] rounded-[16px] bg-[#1D1F37] p-[12px]">
					<div className="mb-[24px]">
						<div className="w-full">
							<TextAreaDesc />
						</div>
					</div>
					<div className="mb-[32px] flex max-h-[28px] justify-end">
						<RandomButton />
					</div>

					<div className="flex flex-wrap gap-[8px]">
						{RELATIONSHIP_OPTIONS.map((option) => (
							<button
								key={option.id}
								className="flex flex-col items-center justify-center rounded-[12px] bg-[#003B5F] px-[12px] py-[6px]"
								onClick={() => handleAddRelationship(option.text)}
							>
								<span className="text-[12px] font-medium text-[#0394EC]">
									{option.text}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* TODO: вынести в отдельный компонент */}
				<div>
					<span className="mb-[12px] block text-[16px] font-semibold">
						Clothing
					</span>
					<div className="mb-[16px] flex items-center justify-center gap-[8px]">
						<button className="rounded-[12px] bg-[#1D1F37] px-[12px] py-[6px] text-[12px] font-semibold leading-[150%]">
							Outfit
						</button>
						<button className="rounded-[12px] bg-[#1D1F37] px-[12px] py-[6px] text-[12px] font-semibold leading-[150%]">
							Accessories
						</button>
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

export default Relationship;
