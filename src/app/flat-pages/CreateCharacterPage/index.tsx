"use client";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import CharacterType from "./components/CharacterType";
import { useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import BasicInfo from "./components/BasicInfo";

const CreateCharacterPage = () => {
	const { step, setStep, setCharType } = useGenerateImageStore();
	const { getStoredData } = useLocalStorage();

	useEffect(() => {
		const storedData = getStoredData();
		if (storedData) {
			try {
				const currentStep = storedData.step;
				setStep(currentStep || 1);
				setCharType(storedData.charType || "Realistic");
			} catch (error) {
				console.error("Ошибка при чтении localStorage:", error);
			}
		}
	}, []);

	return (
		<div className="flex h-fit justify-center sm:h-[100vh]">
			<div className="relative mt-[16px] w-[491px] overflow-x-hidden rounded-[24px] bg-[#121423] p-[32px] sm:rounded-none sm:p-[16px]">
				{step === 1 && <CharacterType />}
				{step === 2 && <BasicInfo />}
				{step === 3 && (
					<div>Step 3 - Set up Personality (компонент в разработке)</div>
				)}
				{step === 4 && <div>Step 4 - Additional (компонент в разработке)</div>}
				{step === 5 && <div>Step 5 - Summary (компонент в разработке)</div>}
			</div>
		</div>
	);
};

export default CreateCharacterPage;
