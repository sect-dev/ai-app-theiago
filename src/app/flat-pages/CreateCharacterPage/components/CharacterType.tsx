"use client";

import { useEffect } from "react";
import Image from "next/image";
import RealisticImage from "@/../public/images/createpage/realistic-first-page.png";
import AnimeImage from "@/../public/images/createpage/anime-first-page.png";
import useLocalStorage from "../hooks/useLocalStorage";
import FirstStepImage from "@/../public/images/createpage/first-step.png";
import clsx from "clsx";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import NextButton from "./NextButton";

const CharacterType = () => {
	const { charType, setCharType, setStep } = useGenerateImageStore();
	const { getStoredData, saveToStorage } = useLocalStorage();
	const isAnime = charType === "Anime";
	const isRealistic = charType === "Realistic";

	useEffect(() => {
		const storedData = getStoredData();
		const initialCharType = storedData.charType || "Realistic";
		setCharType(initialCharType);
	}, [getStoredData, setCharType]);

	const handleCharTypeSelect = (charType: string) => {
		setCharType(charType);
	};

	const handleNextClick = () => {
		saveToStorage({ step: 2, charType });
		setStep(2);
	};

	return (
		<div>
			<div className="mb-[32px] flex flex-col gap-[12px] text-center">
				<Image
					src={FirstStepImage.src}
					width={FirstStepImage.width}
					height={FirstStepImage.height}
					alt="first-page-header"
					className="absolute h-[32px] object-cover object-left"
				/>

				<span className="mt-[64px] text-[24px] font-bold leading-[1.3]">
					Create your unique character <br /> in just a few steps
				</span>
				<span className="text-[16px] font-medium opacity-50">
					To start, choose your character&apos;s style
				</span>
			</div>
			<div className="mb-[32px] flex gap-[8px]">
				<button
					className={clsx(
						"inner-shadow relative rounded-[16px] transition-all duration-300",
						isRealistic
							? "border-main-gradient choosen-token-shadow choosen-token-shadow-after"
							: ""
					)}
				>
					<Image
						src={RealisticImage}
						onClick={() => handleCharTypeSelect("Realistic")}
						alt="character-type"
						className="h-[339px] w-[210px] cursor-pointer rounded-[16px] object-cover"
					/>
					<span className="absolute bottom-0 left-0 right-0 z-[1] mb-[12px] text-[18px] font-bold">
						Realistic
					</span>
				</button>

				<button
					className={clsx(
						"inner-shadow relative rounded-[16px] transition-all duration-300",
						isAnime
							? "border-main-gradient choosen-token-shadow choosen-token-shadow-after"
							: ""
					)}
				>
					<Image
						src={AnimeImage}
						onClick={() => handleCharTypeSelect("Anime")}
						alt="character-type"
						className="h-[339px] w-[210px] cursor-pointer rounded-[16px] object-cover"
					/>
					<span className="absolute bottom-0 left-0 right-0 z-[1] mb-[12px] text-[18px] font-bold">
						Anime
					</span>
				</button>
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
