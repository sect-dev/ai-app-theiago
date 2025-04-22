import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import IconDiscover from "@/../public/images/icons/icon-discover.svg";
import IconChats from "@/../public/images/icons/icon-chats.svg";
import IconChatsActive from "@/../public/images/icons/icon-chats-active.svg";
import IconDiscoverActive from "@/../public/images/icons/icon-discover-active.svg";
import IconStars from "@/../public/images/icons/icon-stars.svg";
import IconDollar from "@/../public/images/icons/icon-dollar.svg";
import IconQuestionMark from "@/../public/images/icons/icon-questionmark.svg";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useAuthStore } from "@/app/shared/store/authStore";

interface ComponentProps {
  pathname?: string;
  setIsMenuOpen: (value: boolean) => void;
}

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

const SidebarMenu: FC<ComponentProps> = ({ pathname, setIsMenuOpen }) => {
  const { setMobileChatOpen, isPremium } = useSelectedCardStore();
  const { user } = useAuthStore();
  const [isHidden, setIsHidden] = useState<boolean | null>(true);
  const isChatPage = pathname?.includes("chats");

  const contactBlock = [
    {
      id: 1,
      title: "Contact Us",
      email: "support@theaigo.com",
      icon: IconQuestionMark,
      className: clsx("rounded-t-xl justify-center text-left", {
        "p-0 md:py-8 md:px-4": isChatPage,
        "p-8": !isChatPage,
      }),
      href: user
        ? `mailto:support@theaigo.com?subject=Support Request&body=User Id: ${user.uid}%0AEmail: ${user.email}`
        : "mailto:support@theaigo.com",
    },
    {
      id: 2,
      title: "Subscription",
      icon: IconDollar,
      className: "rounded-b-xl",
      href: "https://quiz.theaigo.com/aigoweb",
    },
  ];

  const handeClick = () => {
    setIsMenuOpen(false);
    if (isChatPage) {
      setMobileChatOpen(false);
    }
  };

  useEffect(() => {
    setIsHidden(isPremium);
  }, [isPremium]);

  if (isHidden) {
    return (
      <ul className="space-y-[4px] text-gray flex flex-col h-full min-w-[52px]">
        {navigationData.map((item, index) => {
          const checkUrl =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);
          const image = checkUrl ? item.activeIcon : item.icon;
          const isLastItem = index === navigationData.length - 1;
          return (
            <li key={item.id} className="group [&>*:a]:rounded-t-[4px]">
              <Link
                onClick={handeClick}
                href={item.href}
                className={clsx(
                  "flex items-center px-[16px] cursor-pointer font-semibold bg-[#121423] text-[14px] gap-[8px] h-[40px] transition-bg duration-300 hover:bg-[#2E335B]",
                  item.className,
                  {
                    "rounded-b-[12px]": isLastItem,
                  }
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
                    "animate-fadeIn text-[#9DB2CE] group-hover:bg-linear-[linear-gradient(180deg, #049AEF 0%, #0862DC 100%)]",
                    {
                      "logo-gradient transition-all duration-300": checkUrl,
                      "hidden md:!block": isChatPage,
                    }
                  )}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          );
        })}

        <div className="flex-grow"></div>

        {contactBlock.map((item, index) => (
          <li key={item.id} className="">
            <Link
              href={item.href}
              className={clsx(
                "px-[16px] cursor-pointer font-semibold bg-[#121423] text-[14px] gap-[2px] h-[40px] transition-bg duration-300 hover:bg-[#2E335B]",
                item.className,
                {
                  "flex items-center justify-start gap-[8px]": index !== 0,
                  "flex flex-col items-left gap-[2px]": index === 0,
                }
              )}
            >
              {item.icon && (
                <Image
                  src={item.icon.src}
                  width={item.icon.width}
                  height={item.icon.height}
                  alt="dollar sign"
                  className={clsx("size-[20px]", {
                    "block md:hidden": index === 0,
                    hidden: index === 0 && !isChatPage,
                  })}
                />
              )}
              <span
                className={clsx(
                  "animate-fadeIn gap-1 text-[#9DB2CE] group-hover:bg-linear-[linear-gradient(180deg, #049AEF 0%, #0862DC 100%)]",
                  {
                    "hidden md:!block": isChatPage,
                  }
                )}
              >
                {item.title}
              </span>{" "}
              {item.email && (
                <span
                  className={clsx("text-white", {
                    "hidden md:!block": isChatPage,
                  })}
                >
                  {item.email}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-[4px] text-gray">
      {navigationData.map((item) => {
        const checkUrl =
          item.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(item.href);
        const image = checkUrl ? item.activeIcon : item.icon;
        return (
          <li key={item.id} className="group [&>*:a]:rounded-t-[4px]">
            <Link
              onClick={handeClick}
              href={item.href}
              className={clsx(
                "flex px-[16px] items-center cursor-pointer font-semibold bg-[#121423] text-[14px] gap-[8px] h-[40px] transition-bg duration-300 hover:bg-[#2E335B]",
                item.className
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
                  "animate-fadeIn text-[#9DB2CE] group-hover:bg-linear-[linear-gradient(180deg, #049AEF 0%, #0862DC 100%)]",
                  {
                    "logo-gradient transition-all duration-300": checkUrl,
                    "hidden md:!block": isChatPage,
                  }
                )}
              >
                {item.title}
              </span>
            </Link>
          </li>
        );
      })}
      {!isHidden && (
        <li>
          <Link
            href="https://quiz.theaigo.com/aigoweb#welcome"
            rel="nofollow"
            className={clsx(
              "cursor-pointer animate-fadeIn block w-full font-semibold text-[14px] py-[12px] rounded-t-[4px] rounded-b-[12px] px-[16px] h-[40px] main-gradient text-white ",
              {
                "!px-0 !py-0": isChatPage,
              }
            )}
          >
            <span
              className={clsx(
                "relative z-[5] h-full flex items-center gap-[8px]",
                {
                  "justify-center": isChatPage,
                }
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
          </Link>
        </li>
      )}
    </ul>
  );
};

export default SidebarMenu;
