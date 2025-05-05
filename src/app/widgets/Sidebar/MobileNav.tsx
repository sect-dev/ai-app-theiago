import React, { FC } from "react";
import Image from "next/image";
import IconDiscover from "@/../public/images/icons/icon-discover.svg";
import IconChats from "@/../public/images/icons/icon-chats.svg";
import IconChatsActive from "@/../public/images/icons/icon-chats-active.svg";
import IconDiscoverActive from "@/../public/images/icons/icon-discover-active.svg";
import IconStars from "@/../public/images/icons/icon-stars.svg";
import Link from "next/link";

import clsx from "clsx";
import { usePaymentStore } from "@/app/shared/store/paymentStore";

const navigationData = [
  {
    title: "Explore",
    id: 1,
    icon: IconDiscover,
    activeIcon: IconDiscoverActive,
    href: "/",
    className: "rounded-b-[4px] rounded-t-[12px]",
  },
  {
    title: "Chats",
    id: 2,
    icon: IconChats,
    activeIcon: IconChatsActive,
    href: "/chats",
    className: "rounded-[4px]",
  },
];

interface ComponentProps {
  pathname?: string;
}

const SidebarMenu: FC<ComponentProps> = ({ pathname }) => {
  const { setPaymentModal } = usePaymentStore();
  const isChatPage = pathname?.includes("chats");
  return (
    <ul className="space-y-[4px] text-gray md:flex md:h-[56px] md:w-[128px] md:space-y-0 md:overflow-hidden">
      {navigationData.map((item) => {
        const checkUrl =
          item.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(item.href);
        const image = checkUrl ? item.activeIcon : item.icon;
        return (
          <li
            key={item.id}
            className="group md:size-full [&>*:a]:rounded-t-[4px]"
          >
            <Link
              href={item.href}
              className={clsx(
                "transition-bg flex h-[40px] cursor-pointer items-center gap-[8px] bg-[#121423] pl-[16px] text-[14px] font-semibold duration-300 hover:bg-[#2E335B] md:size-full md:flex-col md:justify-center md:gap-0 md:rounded-none md:bg-transparent md:pl-0 md:text-[10px] md:hover:bg-transparent",
                item.className,
                {
                  "justify-center !pl-0": isChatPage,
                },
              )}
            >
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt="Explore icon"
                className="size-[20px]"
              />
              <span
                className={clsx(
                  "group-hover:bg-linear-[linear-gradient(180deg, #049AEF 0%, #0862DC 100%)] animate-fadeIn text-[#9DB2CE]",
                  {
                    "logo-gradient transition-all duration-300": checkUrl,
                    "hidden md:!block": isChatPage,
                  },
                )}
              >
                {item.title}
              </span>
            </Link>
          </li>
        );
      })}
      <li>
        <button
          onClick={() => setPaymentModal(true)}
          className={clsx(
            "main-gradient block h-[40px] w-full cursor-pointer rounded-b-[12px] rounded-t-[4px] px-[16px] py-[12px] text-[14px] font-semibold text-white md:hidden",
            {
              "!px-0 !py-0": isChatPage,
            },
          )}
        >
          <span
            className={clsx(
              "relative z-[5] flex h-full items-center gap-[8px]",
              {
                "justify-center": isChatPage,
              },
            )}
          >
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
