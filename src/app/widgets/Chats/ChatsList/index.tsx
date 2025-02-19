'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";
import clsx from "clsx";
import {IAvatar} from "@/app/shared/api/types";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import {useParams, useRouter} from "next/navigation";

const ChatsList = () => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const params = useParams()
  const router = useRouter()
  const [filteredCharacters, setFilteredCharacters] = useState<IAvatar[]>([]);

  const characters = useSelectedCardStore((state) => state.characters);

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  const handleChatChange = (chatId:number) => {
    router.push(`/chats/${chatId}`);
  }

  useEffect(() => {
    const chatStartedIds = JSON.parse(localStorage.getItem("chatStartedIds") || "[]");

    if (characters) {
      const filtered = characters.filter((character) => chatStartedIds.includes(character.id));
      setFilteredCharacters(filtered);
    }
  }, [characters]);

  return (
    <div
      className={clsx("h-[calc(100%-24px)] w-full max-w-[220px] bg-[#121423] py-[20px] rounded-l-[24px] rounded-r-[8px] transition-width duration-300", {
        "max-w-[82px] ": collapse
      })}>
      <div className="flex items-center justify-between px-[20px] mb-[9px]">
        {!collapse && <p className="animate-fadeIn text-[17px] font-medium">Chats</p>}
        <button onClick={handleCollapse}
                className="flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px]">
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
        {filteredCharacters.map(item => {
          return (
            <button
              key={item.id}
              onClick={() => handleChatChange(item.id)}
              className={clsx("flex  px-[20px] py-[6px]", {
                "bg-[#0680E642]": +item.id === +params.id
              })}
            >
               <span className="flex items-center gap-[8px]">
                <span className="relative">
                <span className="relative block overflow-hidden rounded-[16px] size-[42px]">
                  <Image
                    src={item.avatar}
                    fill
                    alt="nicole image"
                    className="object-cover"
                  />
                </span>
                {collapse && (
                  <span
                    className="animate-fadeIn bg-main-gradient absolute right-[-2px] bottom-[-2px] flex items-center justify-center font-semibold text-[11px] rounded-full size-[14px] mt-[8px]">
                    1
                  </span>
                )}
            </span>
                 {!collapse && (
                   <span className="animate-fadeIn text-left">
                <span className="font-medium text-[14px] tracking-[-0.04em]">{item.name}</span>
                <span className="font-medium text-[12px] max-w-[125px] opacity-50 line-clamp-1 tracking-[-0.04em]">Hey how are you today? Im fine! thanks</span>
              </span>
                 )}
          </span>
              {!collapse && (
                <span className="animate-fadeIn flex flex-col items-end pl-[5px] ">
                  <span className="text-[12px] font-medium tracking-[-0.04em]">16:44</span>
                  <span
                    className="bg-main-gradient flex items-center justify-center font-semibold text-[11px] rounded-full size-[14px] mt-[8px]">1</span>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default ChatsList;