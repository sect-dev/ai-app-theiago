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
import SummaryPageSkeleton from "./SummaryPageSkeleton";
import { useStartChat } from "@/app/shared/hooks/useStartChat";
import { startConversation } from "@/app/shared/api/mesages";
import {
	mapBackendMessagesToMessages,
	safeLocalStorage
} from "@/app/shared/helpers";
import { saveCharacterToLocalStorage } from "@/app/shared/helpers";
import { useAuthStore } from "@/app/shared/store/authStore";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { useState } from "react";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useRouter } from "next/navigation";
import {
	getCharacterInfoByConstructor,
	getCharacterInfoById
} from "@/app/shared/api/getCharacterById";

const INITIAL_CHARACTER = {
	id: "",
	avatar: null,
	name: "",
	description: "",
	age: "",
	params: []
};

const Summary = () => {
	const { saveToStorage, clearStorage } = useLocalStorage();
	const {
		gender,
		setStep,
		isCreatingCharacter,
		createdCharacter,
		createCharacterError
	} = useGenerateImageStore();
	const [loading, setLoading] = useState(false);
	const { setSelectedCharacterId, setCharacters } = useSelectedCardStore();
	const localStorageCharacter = safeLocalStorage.get("createdCharacter");
	const { name, description, age, params, avatar, id } =
		createdCharacter || JSON.parse(localStorageCharacter ?? "{}");
	const { user, setIsPremium } = useAuthStore();
	const { setTokens } = usePaymentStore();
	const navigate = useRouter();

	if (isCreatingCharacter || loading) return <SummaryPageSkeleton />;

	if ((!localStorageCharacter || createCharacterError) && !loading) {
		return (
			<div className="flex flex-col items-center justify-center">
				<span>An error occurred, please try again</span>
				<button
					className="bg-red-text-gradient bg-clip-text text-[14px] font-bold text-transparent"
					onClick={() => {
						clearStorage();
						setStep(1);
					}}
				>
					Create another girl
				</button>
			</div>
		);
	}

	const handleMakeItRealClick = async () => {
		try {
			setLoading(true);

			const characterInfo = await getCharacterInfoById(id);

			const startChat = await startConversation({
				userId: user?.uid ?? "id",
				characterId: characterInfo?.character_id.toString() ?? null
			});
			const startChatMessages = mapBackendMessagesToMessages(
				startChat?.response ?? []
			);
			const tokens = startChat?.tokens_remaining || 0;
			const preparedCharacters = saveCharacterToLocalStorage(
				characterInfo,
				startChatMessages,
				tokens
			);
			setSelectedCharacterId(characterInfo?.character_id.toString() ?? "");
			setCharacters(preparedCharacters ?? null);
			setTokens(tokens ?? 0);
			setIsPremium(startChat?.is_premium ?? false);
			clearStorage();
			safeLocalStorage.remove("createdCharacter");
			navigate.push(`/chats`);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
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

				<div className="flex items-center justify-center">
					<div className="relative mb-[32px] h-[447px] w-[427px] overflow-hidden rounded-[32px] md:h-[378px] md:w-[343px]">
						<Image
							src={avatar || ""}
							alt="avatar"
							fill
							className="rounded-[32px] object-cover object-top"
						/>
					</div>
				</div>

				<div className="mb-[20px]">
					<span className="traking-wide mb-[12px] block text-[18px] font-bold leading-[130%]">
						{name}
					</span>
					<span className="text-[16px] font-medium">{description}</span>
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
							<span className="block text-[16px] font-medium">{age}</span>
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

				<SummarySlider params={params} />

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
