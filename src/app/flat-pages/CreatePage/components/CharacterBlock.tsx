"use client";

import React, { useState, useEffect, useMemo } from "react";
import ChangeButton from "./ChangeButton";
import { getCharactersList } from "@/app/shared/api/characters";
import { Character } from "@/app/shared/api/types";
import Image from "next/image";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { getCharacterInfoById } from "@/app/shared/api/getCharacterById";
import { useCharacterCreateStore } from "@/app/shared/store/createCharacterStore";
import { safeLocalStorage } from "@/app/shared/helpers";

interface Props {
	characters: Character[];
}

const CharacterBlock = React.memo((props: Props) => {
	const { characters } = props;
	const { selectedCharacterId, charactersList, setCharactersList } =
		useSelectedCardStore();
	const { characterId, setCharacterId, setChangeCharacterModal } =
		useCharacterCreateStore();
	const [character, setCharacter] = useState<Character | null>(null);
	const charFromGenerated = safeLocalStorage.get("charFromGenerated");

	useEffect(() => {
		console.log("useeffect", 1231231);
		if (characters.length > 0) {
			setCharactersList(characters);
		}

		if (charFromGenerated) {
			setCharacterId(Number(charFromGenerated));
			return;
		}

		setCharacterId(characters[0]?.id);
	}, [charFromGenerated]);

	const mainChar = useMemo(() => {
		console.log("usememo", 1231231);
		if (characterId) {
			return characters.find((char) => char.id == characterId) || null;
		}
		return characters[0] || null;
	}, [characterId]);

	const handleClick = () => {
		console.log("opened modal");
		setChangeCharacterModal(true);
	};

	return (
		<>
			<div className="hidden flex-col items-center xs:flex">
				<span className="mb-[16px] text-[20px] font-bold leading-[1.3]">
					Create Image
				</span>
				<div className="relative">
					<Image
						onClick={handleClick}
						src={`${mainChar?.avatar}?format=webp&quality=100`}
						width={88}
						height={88}
						alt="image"
						className="mb-[12px] h-[88px] w-[88px] rounded-[24px] object-cover"
						priority={false}
					/>
					<div className="absolute -right-[6px] bottom-[4px] rounded-[16px] bg-[#003B5F] px-[8px] py-[2px]">
						<Image
							src="/images/icons/icon-change-button.svg"
							width={24}
							height={24}
							alt="change button"
						/>
					</div>
				</div>

				<span className="text-[18px] font-bold leading-[1.3]">
					{mainChar?.name}
				</span>
			</div>

			<div className="block max-w-[293px] rounded-tl-[24px] rounded-tr-[8px] xs:hidden">
				<div className="relative h-[293px] w-full">
					<Image
						src={`${mainChar?.avatar}?format=webp&quality=85&width=500`}
						fill
						sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 300px"
						alt="image"
						className="rounded-tl-[24px] rounded-tr-[8px] object-cover"
						priority={false}
					/>
					<ChangeButton className="absolute left-[20px] top-[20px]" />
					<div className="absolute bottom-[20px] left-[20px] grid grid-rows-2 gap-[4px]">
						<span className="text-[20px] font-semibold leading-[1.3]">
							{mainChar?.name}
						</span>
						<span className="text-[14px] font-medium leading-[1.5] opacity-60">
							{mainChar?.occupation}
						</span>
					</div>
				</div>
				<div className="rounded-bl-[24px] rounded-br-[8px] bg-[#121423] p-[20px]">
					<span className="align-middle text-[14px] font-normal leading-[150%] opacity-60">
						{mainChar?.description.en}
					</span>
				</div>
			</div>
		</>
	);
});

CharacterBlock.displayName = "CharacterBlock";

export default CharacterBlock;
