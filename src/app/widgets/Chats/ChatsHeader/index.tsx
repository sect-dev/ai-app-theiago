'use client'
import React, {FC, useEffect} from 'react';
import Image from "next/image";
import IcnPlus from "@/../public/images/icons/icon-plus.svg";
import IcnCoins from "@/../public/images/icons/icon-coins.svg";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import clsx from "clsx";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";
import IconBack from "@/../public/images/icons/icon-back.svg";

interface ComponentProps {
  avatar: string | null
  name: string | null
}

const ChatsHeader:FC<ComponentProps> = ({avatar,name = 0}) => {
  const { tokens, setMobileChatOpen, setInfoCollapse, characterInfoCollapse, setMobileInfoOpen } = useSelectedCardStore();

  return (
    <div className={clsx("animate-fadeIn flex items-center justify-between overflow-hidden rounded-[8px] bg-[#121423] py-[16px] px-[24px] transition-transform duration-300 md:rounded-[16px] md:py-[14px] md:px-[12px]", {})}>
      <button onClick={() => setMobileInfoOpen(true)} className="flex items-center gap-[12px]">
        <div
          onClick={() => setMobileChatOpen(false)}
          className="hidden size-[28px] rounded-[8px] bg-[#191B2C] flex items-center justify-center md:flex"
        >
          <Image
            src={IconBack.src}
            width={IconBack.width}
            height={IconBack.height}
            alt="icon back"
          />
        </div>
        <div className="flex items-center gap-[12px]">
          <span className="relative block overflow-hidden rounded-[16px] size-[42px]">
          <Image
            src={avatar ?? ''}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 42px"
            alt="nicole image"
            className="object-cover object-top"
          />
        </span>
          <div className="text-left">
            <p className="font-medium text-[17px] tracking-[-0.04em] mb-[2px]">{name}</p>
            <p className="flex items-center gap-[4px] font-medium max-w-[125px] ">
              <span className="block rounded-full bg-[#4DCF9F] size-[4px]" />
              <span className="text-[12px] opacity-50 line-clamp-1 tracking-[-0.04em]">Online</span>
            </p>
          </div>
        </div>
      </button>
      <div className="flex items-center gap-[8px]">
        {tokens
          ? <button className="block main-gradient h-[24px] rounded-[15px] px-[12px]">
            <span className="relative z-[5] flex items-center">
              <Image
                src={IcnPlus.src}
                width={IcnPlus.width}
                height={IcnPlus.height}
                alt="plus image"
                className="size-[8px]"
              />
              <span className="text-[12px] font-bold pl-[8px] pr-[4px]">{tokens}</span>
              <Image
                src={IcnCoins.src}
                width={IcnCoins.width}
                height={IcnCoins.height}
                alt="coins image"
              />
          </span>
          </button>
          : <span className="animate-pulse block bg-main-gradient h-[24px] w-[72px] flex items-center rounded-[15px] " />
        }
        <button
          onClick={() => setInfoCollapse(false)}
          className={clsx("hidden animate-fadeIn z-[5] flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px]", {
            "!flex": characterInfoCollapse
          })}
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
    </div>
  );
};

export default ChatsHeader;