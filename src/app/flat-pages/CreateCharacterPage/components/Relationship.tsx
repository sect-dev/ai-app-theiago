import Image from "next/image";
import ThirdStep from "@/../public/images/createpage/third-step.png";
import StepBackButton from "./StepBackButton";
import TextAreaName from "./Textarea";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import useLocalStorage from "../hooks/useLocalStorage";
import TextAreaDesc from "./TextareaDesc";
import RandomNameButton from "./RandomNameButton";
import RandomDescButton from "./RandomDescButton";
import ClothingComponent from "./ClothingComponent";
import { RELATIONSHIP_OPTIONS } from "../consts";
import useAddCharacter from "../hooks/useAddCharacter";

const Relationship = () => {
	const {
		name,
		setStep,
		relationship,
		setRelationship,
		outfit,
		accessories,
		setIsCreatingCharacter,
		setCreatedCharacter,
		setCreateCharacterError
	} = useGenerateImageStore();
	const { saveToStorage } = useLocalStorage();
	const { addCharacter } = useAddCharacter();

	const handleAddRelationship = (text: string) => {
		setRelationship(text);
	};

	const handleNextClick = async () => {
		try {
			saveToStorage({ step: 6, name, relationship, outfit, accessories });
			setStep(6);
			setIsCreatingCharacter(true);
			setCreateCharacterError(null);

			const characterData = await addCharacter();
			if (characterData) {
				setCreatedCharacter({
					id: characterData.id,
					name: characterData.name,
					description: characterData.description,
					age: characterData.age,
					params: characterData.params,
					avatar: characterData.avatar
				});
			}
		} catch (error) {
			setCreateCharacterError(
				error instanceof Error ? error.message : "Failed to create character"
			);
		} finally {
			setIsCreatingCharacter(false);
		}
	};

	const isNextDisabled = !name || !relationship || !outfit || !accessories;

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
							<RandomNameButton />
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
						<RandomDescButton />
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

				<ClothingComponent />
				{/* TODO: вынести в NextButton */}
				<div className="flex justify-center">
					<button
						disabled={isNextDisabled}
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
