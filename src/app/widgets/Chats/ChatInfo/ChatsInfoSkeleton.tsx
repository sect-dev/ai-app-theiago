import React from 'react';
import Image from "next/image";
import clsx from "clsx";
import IconCollapse from "../../../../../public/images/icons/icon-collapse.svg";
import ChatsInfoPosts from "@/app/widgets/Chats/ChatInfo/ChatsInfoPosts";

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

const ChatsInfoSkeleton = () => {
  return (
    <div className={clsx("bg-[#121423] rounded-l-[8px] w-[292px] shrink-0 rounded-r-[24px] transition-width duration-300", {})}>
      <div className="relative bg-[#1F2237] flex items-end p-[20px] h-[293px] rounded-tl-[8px] rounded-tr-[24px] overflow-hidden">
        <div className="relative z-[5] space-y-[8px]">
          <div className="animate-pulse bg-[#121423] w-[80px] h-[20px] rounded-[9px]" />
          <div className="animate-pulse bg-[#121423] w-[80px] h-[20px] rounded-[9px]"/>
        </div>
        <button className="absolute left-[20px] top-[20px] z-[5] flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px]">
          <Image
            src={IconCollapse.src}
            width={IconCollapse.width}
            height={IconCollapse.height}
            alt="collapse image"
            className="size-[18px]"
          />
        </button>
      </div>
      <div className="p-[20px] space-y-[8px]">
        <div className="animate-pulse bg-[#1F2237] rounded-[12px] w-full h-[16px]"/>
        <div className="animate-pulse bg-[#1F2237] rounded-[12px] w-full h-[16px]"/>
        <div className="animate-pulse bg-[#1F2237] rounded-[12px] w-1/2 h-[16px]"/>
      </div>
      <div>
        <div className="flex gap-[20px] px-[20px]">
          {tabsCaptions.map(item => {
            return (
              <button key={item.id} className={clsx("text-[14px] px-[7px] h-[27px] font-semibold opacity-[20%] transition-all duration-300", {
                "logo-gradient !opacity-100": 'Posts' === item.title
              })}>
                {item.title}
                <span className={clsx("block w-full h-[6px] rounded-t-[4px] transition-opacity duration-300 main-gradient opacity-0", {
                  "!opacity-100": 'Posts' === item.title
                })} />
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-[8px] px-[8px] overflow-auto max-h-[34vh] pb-[8px]" >
          {Array.from({length: 4}).map((_,index) => {
            return (
              <div key={index} className="animate-pulse w-[48%] h-[157px] rounded-[12px] bg-[#1F2237] " />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatsInfoSkeleton;