"use client"

import React, { useState, useEffect, useMemo } from 'react';
import ChangeButton from './ChangeButton';
import { getCharactersList } from '@/app/shared/api/characters';
import { Character } from '@/app/shared/api/types';
import Image from "next/image";
import { useSelectedCardStore } from '@/app/shared/store/publicStore';
import { getCharacterInfoById } from '@/app/shared/api/getCharacterById';
import { useCharacterCreateStore } from '@/app/shared/store/createCharacterStore';
 
interface Props {
	characters: Character[];
}

const CharacterBlock = React.memo((props: Props) => {
	const {characters} = props;
	const {selectedCharacterId, charactersList, setCharactersList} = useSelectedCardStore();
	const {characterId, setCharacterId} = useCharacterCreateStore();
	const [character, setCharacter] = useState<Character | null>(null);

	useEffect(() => {
		if (characters.length > 0) {
			setCharactersList(characters)
		}

		if (selectedCharacterId) {
			setCharacterId(typeof selectedCharacterId === "string" ? Number(selectedCharacterId) : selectedCharacterId)
		} else if (characters[3]?.id){
			setCharacterId(Number(characters[3].id))
		}
	}, [])

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


	const mainChar = useMemo(() => {
		if (characterId) {
			return characters.find(char => char.id == characterId) || null
		}
		return selectedCharacterId ? character : characters[2] || null;
	}, [characterId, selectedCharacterId, character, characters])


	return (
		<>
		<div className='xs:flex hidden flex-col items-center justify-center gap-[12px]'>
			<span>Create Image</span>
			        <Image
          src={`${mainChar?.avatar}?format=webp&quality=85&width=500`}
          width={88}
		  height={88}
          alt="image"
          className="object-cover rounded-[24px]"
          priority={false}
        />
		</div>

		<div className="xs:hidden block rounded-tl-[24px]  rounded-tr-[8px] ">
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
			<div className="p-[20px] bg-[#121423] rounded-bl-[24px] rounded-br-[8px]">
				<span className="text-[14px] leading-[150%] font-normal opacity-60 align-middle">
					{mainChar?.description.en}
				</span>
			</div>
		</div>
		</>

		
	)
})

CharacterBlock.displayName = 'CharacterBlock';

export default CharacterBlock;