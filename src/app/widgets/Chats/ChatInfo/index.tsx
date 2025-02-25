"use client"
import React, {FC, useState} from 'react';
import Image from "next/image";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";
import clsx from "clsx";
import ChatsInfoPosts from "@/app/widgets/Chats/ChatInfo/ChatsInfoPosts";
// import ChatsInfoVideos from "@/app/widgets/Chats/ChatInfo/ChatsInfoVideos";
import {Character} from "@/app/shared/api/types";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import IconBack from "../../../../../public/images/icons/icon-back.svg";

const tabsCaptions = [
  {
    title: 'Posts',
    id: 1,
  },
  {
    title: 'Videos',
    id: 2,
  },
]

interface ComponentProps {
  characterInfo: Character
}

const ChatInfo:FC<ComponentProps> = ({characterInfo}) => {
  const {setInfoCollapse, characterInfoCollapse, isMobileInfoOpen, setMobileInfoOpen} = useSelectedCardStore()
  const [tabs,setTabs] = useState<string>('Posts')

  const handleCollapse = () => {
    setInfoCollapse(true)
  }

  const handleTabs = (value: string) => {
    setTabs(value)
  }
  return (
    <div>
      <div className={clsx("animate-fadeIn bg-[#121423] rounded-l-[8px] w-[292px] shrink-0 rounded-r-[24px] transition-all duration-300 md:absolute md:h-full md:left-0 md:top-0 md:w-full md:-translate-x-[-105%]", {
        "hidden md:block": characterInfoCollapse,
        "md:!translate-x-0": isMobileInfoOpen
      })}>
        <div className="chatInfoImage relative flex items-end p-[20px] h-[293px] rounded-tl-[8px] rounded-tr-[24px] overflow-hidden">
          {characterInfo?.image && <Image
            src={characterInfo?.image}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 292px"
            fill
            alt="image"
            className="object-cover object-top"
          />}
          <div className="relative z-[5]">
            <p className="text-[20px] font-semibold">{characterInfo.name}</p>
            <p className="text-[14px] font-medium opacity-[60%]">{characterInfo.shortDescription?.en}</p>
          </div>

          <button onClick={handleCollapse} className="flex md:hidden absolute left-[20px] top-[20px] z-[5] items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px]">
            <Image
              src={IconCollapse.src}
              width={IconCollapse.width}
              height={IconCollapse.height}
              alt="collapse image"
              className="size-[18px] block md:hidden"
            />
          </button>
          <button onClick={() => setMobileInfoOpen(false)} className="hidden md:flex absolute left-[20px] top-[20px] z-[5] items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px]">
            <Image
              src={IconBack.src}
              width={IconBack.width}
              height={IconBack.height}
              alt="icon back"
              className=""
            />
          </button>
        </div>
        <div className="p-[20px]">
          <p className="text-[14px] opacity-[60%]">
            {characterInfo.description.en}
          </p>
        </div>
        <div className="bg-[#121423]">
          <div className="flex gap-[20px] px-[20px] ">
            {tabsCaptions.map(item => {
              return (
                <button onClick={() => handleTabs(item.title)} key={item.id} className={clsx("text-[14px] px-[7px] h-[27px] font-semibold opacity-[20%] transition-all duration-300", {
                  "logo-gradient !opacity-100": tabs === item.title
                })}>
                  {item.title}
                  <span className={clsx("block w-full h-[6px] rounded-t-[4px] transition-opacity duration-300 main-gradient opacity-0", {
                    "!opacity-100": tabs === item.title
                  })} />
                </button>
              )
            })}
          </div>
          <div className="px-[8px] overflow-y-auto max-h-[34vh] pb-[8px]">
            {tabs === 'Posts' && <ChatsInfoPosts content={characterInfo.listProfilePhoto} />}
            {/*{tabs === 'Videos'&& <ChatsInfoVideos content={characterInfo.listVideo} />}*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;