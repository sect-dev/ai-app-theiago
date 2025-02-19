import React, {FC} from 'react';
import Image from "next/image";
import IcnPlus from "@/../public/images/icons/icon-plus.svg";
import IcnCoins from "@/../public/images/icons/icon-coins.svg";

interface ComponentProps {
  avatar: string
  name: string
}

const ChatsHeader:FC<ComponentProps> = ({avatar,name}) => {
  return (
    <div className="flex items-center justify-between overflow-hidden rounded-[8px] bg-[#121423] py-[16px] px-[24px]">
      <div className="flex items-center gap-[12px]">
        <span className="relative block overflow-hidden rounded-[16px] size-[42px]">
          <Image
            src={avatar}
            fill
            alt="nicole image"
            className="object-cover object-top"
          />
        </span>
        <div className="text-left">
          <p className="font-medium text-[17px] tracking-[-0.04em]">{name}</p>
          <p className="flex items-center gap-[4px] font-medium max-w-[125px] ">
            <span className="block rounded-full bg-[#4DCF9F] size-[4px]" />
            <span className="text-[12px] opacity-50 line-clamp-1 tracking-[-0.04em]">Online</span>
          </p>
        </div>
      </div>
      <button className="block bg-main-gradient h-[24px] flex items-center rounded-[15px] px-[12px]">
        <Image
          src={IcnPlus.src}
          width={IcnPlus.width}
          height={IcnPlus.height}
          alt="plus image"
          className="size-[8px]"
        />
        <span className="text-[12px] font-bold pl-[8px] pr-[4px]">20</span>
        <Image
          src={IcnCoins.src}
          width={IcnCoins.width}
          height={IcnCoins.height}
          alt="coins image"
          className="w-[11px] h-[12px]"
        />
      </button>
    </div>
  );
};

export default ChatsHeader;