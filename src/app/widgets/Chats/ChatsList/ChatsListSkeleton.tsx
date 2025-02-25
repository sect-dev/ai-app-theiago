'use client'
import React, {useState} from 'react';
import Image from "next/image";
import clsx from "clsx";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";

const ChatsListSkeleton = () => {
  const [collapse, setCollapse] = useState<boolean>(false)

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <div
      className={clsx("h-[calc(100%-24px)] w-full max-w-[220px] bg-[#121423] py-[20px] rounded-l-[24px] rounded-r-[8px] transition-width duration-300 md:max-w-full", {
        "max-w-[82px] ": collapse
      })}>
      <div className="flex items-center justify-between px-[20px] mb-[9px]">
        {!collapse && <p className="animate-fadeIn text-[17px] font-medium ">Chats</p>}
        <button onClick={handleCollapse} className="flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px] md:hidden">
          <Image
            src={IconCollapse.src}
            width={IconCollapse.width}
            height={IconCollapse.height}
            alt="collapse image"
            className="size-[18px]"
          />
        </button>
      </div>
      <div className="space-y-[14px]">
        <div className={"flex  px-[20px] "}>
          <span className="flex items-center gap-[8px]">
            <div className="relative">
              <div className="animate-pulse relative block overflow-hidden rounded-[16px] size-[42px] bg-[#1F2237]" />
            </div>
            {!collapse && (
              <div className="animate-fadeIn delay-300 space-y-[4px]">
                <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px]" />
                <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px] md:w-[180px]" />
              </div>
            )}
          </span>
        </div>
        <div className={"flex  px-[20px] "}>
          <span className="flex items-center gap-[8px]">
            <div className="relative">
              <div className="animate-pulse relative block overflow-hidden rounded-[16px] size-[42px] bg-[#1F2237]" />
            </div>
            {!collapse && (
              <div className="animate-fadeIn delay-300 space-y-[4px]">
                <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px]" />
                <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px] md:w-[180px]" />
              </div>
            )}
          </span>
        </div>
        <div className={"flex  px-[20px] "}>
          <span className="flex items-center gap-[8px]">
            <div className="relative">
              <div className="animate-pulse relative block overflow-hidden rounded-[16px] size-[42px] bg-[#1F2237]" />
            </div>
            {!collapse && (
              <div className="animate-fadeIn delay-300 space-y-[4px]">
                <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px]" />
                <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px] md:w-[180px]" />
              </div>
            )}
          </span>
        </div>
        <div className={"flex  px-[20px] "}>
          <span className="flex items-center gap-[8px]">
            <div className="relative">
              <div className="animate-pulse relative block overflow-hidden rounded-[16px] size-[42px] bg-[#1F2237]" />
            </div>
            {!collapse && (
              <div className="animate-fadeIn delay-300 space-y-[4px]">
                <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px]" />
                <div className="animate-pulse font-medium w-[81px] h-[18px] bg-[#1F2237] rounded-[9px] md:w-[180px]" />
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatsListSkeleton;