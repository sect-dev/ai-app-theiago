'use client'
import React, {useState} from 'react';
import Image from "next/image";
import IconCollapse from "../../../../public/images/icons/icon-collapse.svg";
import ImageTest from "../../../../public/images/img/test.png";
import clsx from "clsx";

const Chats = () => {
  const [collapse, setCollapse] = useState<boolean>(false)

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  return (
    <div className={clsx("h-[calc(100%-24px)] max-w-[220px] bg-[#121423] py-[20px] rounded-l-[24px] rounded-r-[8px] transition-width duration-300", {
      "max-w-[82px] ": collapse
    })}>
      <div className="flex items-center justify-between px-[20px] mb-[9px]">
        {!collapse && <p className="animate-fadeIn text-[17px] font-medium">Chats</p>}
        <button onClick={handleCollapse} className="flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px]">
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
        <button className="flex px-[20px] py-[6px]">
          <span className="flex items-center gap-[8px]">
              <span className="relative">
                <span className="relative block overflow-hidden rounded-[16px] size-[42px]">
                  <Image
                    src={ImageTest.src}
                    fill
                    alt="nicole image"
                    className="object-cover"
                  />
                </span>
                {collapse && (
                  <span className="animate-fadeIn bg-main-gradient absolute right-[-2px] bottom-[-2px] flex items-center justify-center font-semibold text-[11px] rounded-full size-[14px] mt-[8px]">
                    1
                  </span>
                )}
            </span>
            {!collapse && (
              <span className="animate-fadeIn text-left">
                <span className="font-medium text-[14px] tracking-[-0.04em]">Alexia</span>
                <span className="font-medium text-[12px] max-w-[125px] opacity-50 line-clamp-1 tracking-[-0.04em]">Hey how are you today? Im fine! thanks</span>
              </span>
            )}
          </span>
          {!collapse && (
            <span className="animate-fadeIn flex flex-col items-end pl-[5px] ">
              <span className="text-[12px] font-medium tracking-[-0.04em]">16:44</span>
              <span className="bg-main-gradient flex items-center justify-center font-semibold text-[11px] rounded-full size-[14px] mt-[8px]">1</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Chats;