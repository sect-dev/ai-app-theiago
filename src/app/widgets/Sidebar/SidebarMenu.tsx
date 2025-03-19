import React, {FC} from 'react';
import Image from "next/image";
import IconDiscover from '@/../public/images/icons/icon-discover.svg';
import IconChats from '@/../public/images/icons/icon-chats.svg';
import IconChatsActive from '@/../public/images/icons/icon-chats-active.svg';
import IconDiscoverActive from '@/../public/images/icons/icon-discover-active.svg';
import IconStars from '@/../public/images/icons/icon-stars.svg';
import Link from "next/link";

import clsx from "clsx";
import {usePaymentStore} from "@/app/shared/store/paymentStore";

const navigationData = [
  {
    title: 'Explore',
    id: 1,
    icon: IconDiscover,
    activeIcon: IconDiscoverActive,
    href:'/',
    className: 'rounded-b-[4px] rounded-t-[12px]'
  },
  {
    title: 'Chats',
    id: 2,
    icon: IconChats,
    activeIcon: IconChatsActive,
    href:'/chats',
    className: 'rounded-[4px]'
  }
]

interface ComponentProps {
  pathname?: string
}

const SidebarMenu:FC<ComponentProps> = ({pathname}) => {
  const {setPaymentModal} = usePaymentStore()
  const isChatPage = pathname?.includes('chats')
  return (
    <ul className="space-y-[4px] text-gray md:bg-[#121423] md:flex md:space-y-0 md:overflow-hidden md:h-[56px] md:w-[128px] md:rounded-[24px] md:backdrop-blur-[10px] md:bg-opacity-50 ">
      {navigationData.map(item => {
        const checkUrl = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
        const image = checkUrl ? item.activeIcon : item.icon
        return (
          <li key={item.id} className="group md:size-full [&>*:a]:rounded-t-[4px]">
            <Link href={item.href} className={clsx("flex items-center pl-[16px] cursor-pointer font-semibold bg-[#121423] text-[14px] gap-[8px] h-[40px] transition-bg duration-300 hover:bg-[#2E335B] md:hover:bg-transparent md:bg-transparent md:justify-center md:size-full md:rounded-none md:gap-0 md:text-[10px] md:flex-col md:pl-0",item.className,{
              "!pl-0 justify-center": isChatPage
            })}>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt="Explore icon"
                className="size-[20px]"
              />
                <span
                  className={clsx("animate-fadeIn text-[#9DB2CE] group-hover:bg-linear-[linear-gradient(180deg, #049AEF 0%, #0862DC 100%)]", {
                    "logo-gradient transition-all duration-300": checkUrl,
                    "hidden md:!block": isChatPage,
                  })}>
                  {item.title}
                </span>
          </Link>
          </li>
        )
      })}
      <li>
        <button onClick={() => setPaymentModal(true)} className={clsx("cursor-pointer block w-full font-semibold text-[14px] py-[12px] rounded-t-[4px] rounded-b-[12px] px-[16px] h-[40px] main-gradient text-white md:hidden", {
          "!px-0 !py-0": isChatPage
        })}>
          <span className={clsx("relative z-[5] h-full flex items-center  gap-[8px]", {
            "justify-center": isChatPage
          })}>
          <Image
            src={IconStars.src}
            width={IconStars.width}
            height={IconStars.height}
            alt="Subscription icon"
            className="size-[20px]"
          />
            {!isChatPage && <span>Subscription</span>}
        </span>
        </button>

      </li>
    </ul>
  );
};

export default SidebarMenu;