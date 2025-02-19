'use client'
import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";
import clsx from "clsx";
import {IAvatar, PreparedAvatar} from "@/app/shared/api/types";
import ChatsListItem from "@/app/widgets/Chats/ChatsList/ChatsListItem";
import ChatsListSkeleton from "@/app/widgets/Chats/ChatsList/ChatsListSkeleton";

interface ComponentProps {
  characterInfo: IAvatar
}

const ChatsList:FC<ComponentProps> = ({characterInfo}) => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const [charactersFromLs,setCharactersFromLs] = useState<PreparedAvatar[]>([])

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  useEffect(() => {
    const savedCharacters = localStorage.getItem('chatStartedCharacters');

    if (savedCharacters) {
      try {
        const characters: PreparedAvatar[] = JSON.parse(savedCharacters);
        setCharactersFromLs(characters);
      } catch (error) {
        console.error("Ошибка парсинга localStorage:", error);
      }
    }
  }, []);

  if(!charactersFromLs || charactersFromLs.length === 0) {
    return <ChatsListSkeleton />
  }

  return (
    <div
      className={clsx("h-[calc(100%-24px)] w-full max-w-[220px] bg-[#121423] py-[20px] rounded-l-[24px] rounded-r-[8px] transition-width duration-300", {
        "max-w-[82px] ": collapse
      })}>
      <div className="flex items-center justify-between px-[20px] mb-[9px]">
        {!collapse && <p className="animate-fadeIn text-[17px] font-medium">Chats</p>}
        <button
          onClick={handleCollapse}
          className="flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px]"
        >
          <Image
            src={IconCollapse.src}
            width={IconCollapse.width}
            height={IconCollapse.height}
            alt="collapse image"
            className="size-[18px]"
          />
        </button>
      </div>
      <div>
        <ChatsListItem
          id={characterInfo.id}
          collapse={collapse}
          image={characterInfo.avatar}
          name={characterInfo.name}
          lastMessage={characterInfo.listMsgs[characterInfo.listMsgs.length-1].en}
        />
        {(charactersFromLs.length > 0) &&
          charactersFromLs.filter(item => item.id !== characterInfo.id).map((character) => (
            <ChatsListItem
              key={character.id}
              id={character.id}
              collapse={collapse}
              image={character.image}
              name={character.name}
              lastMessage={character.listMsgs?.[character.listMsgs.length - 1]?.en || "No messages"}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatsList;