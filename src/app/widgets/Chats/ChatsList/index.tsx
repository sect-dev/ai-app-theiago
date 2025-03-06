'use client'
import React, {FC, useEffect, useState} from 'react';
import Image from "next/image";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";
import clsx from "clsx";
import ChatsListItem from "@/app/widgets/Chats/ChatsList/ChatsListItem";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

const ChatsList = () => {
  const {characters} = useSelectedCardStore()
  const [collapse, setCollapse] = useState<boolean>(false)

  const handleCollapse = () => {
    setCollapse(!collapse)
  }
  return (
    <div
      className={clsx("animate-fadeIn shrink-0 h-[calc(100%-24px)] w-full max-w-[260px] bg-[#121423] py-[20px] rounded-l-[24px] rounded-r-[8px] transition-width duration-300 md:!rounded-[16px] md:opacity-0 md:max-w-full", {
        "!max-w-[82px] ": collapse
      })}>
      <div className="flex items-center justify-between px-[20px] mb-[9px]">
        {!collapse && <p className="animate-fadeIn text-[17px] font-medium">Chats</p>}
        <button
          onClick={handleCollapse}
          className="flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px] md:hidden"
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
        {(characters && characters?.length > 0) &&
          characters
            ?.slice()
            .sort((a, b) => +new Date(b.lastMessageTime) - +new Date(a.lastMessageTime))
            .map((character) => {
             return (
               <ChatsListItem
                 key={character.id}
                 id={character.id}
                 collapse={collapse}
                 image={character.image}
                 name={character.name}
                 lastMessage={character.listMsgs?.[character.listMsgs.length - 1]}
                 lastMessageTime={character.lastMessageTime}
               />
             )
          })}
      </div>
    </div>
  );
};

export default ChatsList;