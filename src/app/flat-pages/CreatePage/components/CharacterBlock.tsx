"use client"

import React, { useState, useEffect } from 'react';
import ChangeButton from './ChangeButton';
import { getCharactersList } from '@/app/shared/api/characters';
import { Character } from '@/app/shared/api/types';
import Image from "next/image";
import { useSelectedCardStore } from '@/app/shared/store/publicStore';
import { getCharacterInfoById } from '@/app/shared/api/getCharacterById';

interface Props {
	characters: Character[];
}

const CharacterBlock = React.memo((props: Props) => {
	const {characters} = props;
	const {selectedCharacterId, charactersList, setCharactersList} = useSelectedCardStore();
	const [character, setCharacter] = useState<Character | null>(null);
	const charactersArray = characters ? Object.values(characters) : [];

	useEffect(() => {
		if (charactersArray.length > 0) {
			setCharactersList(characters)
		}
	}, [])

	console.log("charlist", charactersList)

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (typeof selectedCharacterId === "string") {
					const data = await getCharacterInfoById(selectedCharacterId)
					setCharacter(data)
				}
			} catch (e) {
				console.log("error while fetching character", e)
			}
		}

		fetchData()
	}, [])

	const mainChar = selectedCharacterId ? character : characters[2]


	return (
		<div className="bg-[#121423] max-w-[293px] rounded-tl-[24px] rounded-bl-[24px] rounded-tr-[8px] rounded-br-[8px] ">
			<div className="h-[293px] w-full relative">
        <Image
          src={`${mainChar?.avatar}?format=webp&quality=85&width=500`}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 300px"
          alt="image"
          className="object-cover rounded-tl-[24px] rounded-tr-[8px]"
          priority={false}
        />
				<ChangeButton className="absolute top-[20px] left-[20px]" />
				<div className="grid grid-rows-2 gap-[4px] absolute bottom-[20px] left-[20px]">
					<span className="text-[20px] leading-[1.3] font-semibold">{mainChar?.name}</span>
					<span className="text-[14px] leading-[1.5] font-medium opacity-60">{mainChar?.occupation}</span>
				</div>
			</div>
			<div className="p-[20px]">
				<span className="text-[14px] leading-1.5 font-normal opacity-60 align-middle">
					{mainChar?.description.en}
				</span>
			</div>
		</div>
	)
})

CharacterBlock.displayName = 'CharacterBlock';

export default CharacterBlock;