'use client'
import React from 'react';
import Image from "next/image";
import IconDiscover from '@/../public/images/icons/icon-discover.svg';
import IconChats from '@/../public/images/icons/icon-chats.svg';
import IconChatsActive from '@/../public/images/icons/icon-chats-active.svg';
import IconDiscoverActive from '@/../public/images/icons/icon-discover-active.svg';
import IconStars from '@/../public/images/icons/icon-stars.svg';
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";

const navigationData = [
  {
    title: 'Explore',
    id: 1,
    icon: IconDiscover,
    activeIcon: IconDiscoverActive,
    href:'/'
  },
  {
    title: 'Chats',
    id: 2,
    icon: IconDiscover,
    activeIcon: IconDiscoverActive,
    href:'/chats'
  }
]

const SidebarMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="space-y-[0.31vw] text-gray sm:flex sm:space-y-0 sm:overflow-hidden sm:h-[14.93vw] sm:w-[34.13vw] sm:rounded-[6.40vw] bg-[#121423] sm:backdrop-blur-[10px] sm:bg-opacity-50 ">
      {navigationData.map(item => {
        const checkUrl = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        const image = checkUrl ? item.activeIcon : item.icon
        return (
          <li key={item.id} className="group sm:size-full">
            <Link href={item.href} className={clsx("flex items-center cursor-pointer font-semibold bg-[#121423] text-[1.09vw] rounded-b-[0.31vw] rounded-t-[0.94vw] gap-[0.63vw] py-[0.94vw] px-[1.25vw] transition-bg duration-300 hover:bg-[#2E335B] sm:bg-transparent sm:justify-center sm:size-full sm:!rounded-none sm:gap-0 sm:text-[2.67vw] sm:flex-col",{})}>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt="Explore icon"
                className="size-[1.56vw] sm:size-[5.33vw]"
              />
              <span className={clsx("text-[#9DB2CE] group-hover:bg-linear-[linear-gradient(180deg, #049AEF 0%, #0862DC 100%)]",{
                 "logo-gradient transition-all duration-300": checkUrl,
              })}>{item.title}</span>
          </Link>
          </li>
        )
      })}
      <li className="flex items-center cursor-pointer font-semibold gap-[0.63vw] text-[1.09vw] py-[0.94vw] rounded-t-[0.31vw] rounded-b-[0.94vw] px-[1.25vw] bg-main-gradient text-white sm:hidden">
        <Image
          src={IconStars.src}
          width={IconStars.width}
          height={IconStars.height}
          alt="Subscription icon"
          className="size-[1.56vw]"
        />
        <span>Subscription</span>
      </li>
    </ul>
  );
};

export default SidebarMenu;