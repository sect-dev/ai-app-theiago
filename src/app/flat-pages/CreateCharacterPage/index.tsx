"use client";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import CharacterType from "./components/CharacterType";
import { useEffect, useRef } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import BasicInfo from "./components/BasicInfo";
import SetUpPersonality from "./components/SetUpPersonality";
import Additional from "./components/Additional";
import Relationship from "./components/Relationship";
import Summary from "./components/Summary";

const CreateCharacterPage = () => {
	const { step, setStep, setCharType } = useGenerateImageStore();
	const { getStoredData } = useLocalStorage();

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const isMobile = window.innerWidth <= 570;

		if (isMobile) {
			if (scrollContainerRef.current) {
				scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
			}
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [step]);

	useEffect(() => {
		const storedData = getStoredData();
		if (storedData) {
			try {
				const currentStep = storedData.step;
				setStep(currentStep || 1);
				setCharType(storedData.charType || "Real");
			} catch (error) {
				console.error("Ошибка при чтении localStorage:", error);
			}
		}
	}, []);

	return (
		<div className="flex h-fit justify-center sm:h-[100vh]">
			<div
				ref={scrollContainerRef}
				className="relative mt-[16px] w-[491px] overflow-x-hidden rounded-[24px] bg-[#121423] p-[32px] sm:rounded-none sm:p-[16px]"
			>
				{step === 1 && <CharacterType />}
				{step === 2 && <BasicInfo />}
				{step === 3 && <SetUpPersonality />}
				{step === 4 && <Additional />}
				{step === 5 && <Relationship />}
				{step === 6 && <Summary />}
			</div>
		</div>
	);
};

export default CreateCharacterPage;
