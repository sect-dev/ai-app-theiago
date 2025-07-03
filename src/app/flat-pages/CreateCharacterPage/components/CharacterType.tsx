"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Image1 from "@/../public/images/suggestions/anal-masturbation.png";
import useLocalStorage from "../hooks/useLocalStorage";

const CharacterType = () => {
	const [selectedCharType, setSelectedCharType] = useState<string>("");
	const { saveToStorage, getStoredData, storedData } = useLocalStorage({
		step: 1
	});

	useEffect(() => {
		const storedData = getStoredData();
		const initialCharType = storedData.charType || "Realistic";
		setSelectedCharType(initialCharType);

		saveToStorage({ charType: initialCharType });
	}, [getStoredData, saveToStorage]);

	useEffect(() => {
		if (selectedCharType) {
			saveToStorage({ charType: selectedCharType });
		}
	}, [selectedCharType, saveToStorage]);

	const handleCharTypeSelect = (charType: string) => {
		setSelectedCharType(charType);
	};

	const handleNextClick = () => {
		saveToStorage({ step: 2 });
	};

	if (!selectedCharType) {
		return <div>Loading...</div>; // TODO: add loader
	}

	return (
		<div>
			<div className="mb-[32px] flex flex-col gap-[12px] text-center">
				<span className="text-[24px] font-bold leading-[1.3]">
					Create your unique character <br /> in just a few steps
				</span>
				<span className="text-[16px] font-normal opacity-50">
					To start, choose your character&apos;s style
				</span>

				{selectedCharType}
			</div>

			<div className="mb-[32px] flex gap-[8px]">
				<Image
					src={Image1}
					onClick={() => handleCharTypeSelect("Realistic")}
					alt="character-type"
					className="h-[339px] w-[210px] cursor-pointer rounded-[16px]"
				/>
				<Image
					src={Image1}
					onClick={() => handleCharTypeSelect("Anime")}
					alt="character-type"
					className="h-[339px] w-[210px] cursor-pointer rounded-[16px]"
				/>
			</div>

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
	);
};

export default CharacterType;
