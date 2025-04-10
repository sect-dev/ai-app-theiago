import React from 'react';
import clsx from "clsx";
import Image from "next/image";
import IconSend from "@/../public/images/icons/icon-send.svg";

const ChatsMessagesSkeleton = () => {
  return (
    <div className="h-full">
      <div className="h-[calc(100%-180px)] space-y-[12px]">
        <p className="animate-pulse bg-[#21233A] w-[210px] h-[38px] py-[10px] px-[20px] rounded-[20px] rounded-bl-none"/>
        <p className="animate-pulse bg-[#21233A] w-[290px] h-[38px] py-[10px] px-[20px] rounded-[20px] rounded-bl-none"/>
        <p className="animate-pulse bg-[#21233A] w-[150px] h-[38px] py-[10px] px-[20px] font-medium rounded-[20px] rounded-bl-none"/>
      </div>
      <div className="relative flex gap-[8px]">
        <div className="animate-pulse rounded-[16px] bg-[#21233A] w-full p-[12px] leading-[1.2em] h-[48px] text-[14px] resize-none placeholder:opacity-50"/>
        <div className={clsx("animate-pulse p-[12px] rounded-[16px] bg-[#21233A] shrink-0 transition-bg duration-300 hover:bg-[#2E335B]", {})}>
          <div className="size-[24px]">
            <Image
              src={IconSend.src}
              width={IconSend.width}
              height={IconSend.height}
              alt="send message icon"
              className="size-[24px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsMessagesSkeleton;