"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import IconCollapse from "@/../public/images/icons/icon-collapse.svg";
import clsx from "clsx";
import ChatsListItem from "@/app/widgets/Chats/ChatsList/ChatsListItem";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import ChatsListItemSkeleton from "@/app/widgets/Chats/ChatsList/ChatsListItemSkeleton";
import { Character } from "@/app/shared/api/types";

interface ComponentProps {
  characterInfo: Character | null;
}

const ChatsList: FC<ComponentProps> = ({ characterInfo }) => {
  const { characters, isMobileChatOpen } = useSelectedCardStore();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  if (!characterInfo) {
    return (
      <div
        className={clsx(
          "animate-fadeIn shrink-0 h-full w-full max-w-[260px] bg-[#121423] py-[20px] rounded-l-[24px] rounded-r-[8px] transition-all duration-300 md:!rounded-[16px] md:translate-x-0 md:max-w-full",
          {
            "!max-w-[82px] ": collapse,
            "!translate-x-[105%] delay-500": isMobileChatOpen,
          },
        )}
      >
        <div className="flex items-center justify-between px-[20px] mb-[9px]">
          {!collapse && (
            <p className="animate-fadeIn text-[17px] font-medium">Chats</p>
          )}
          <button
            onClick={handleCollapse}
            className="flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px] md:hidden"
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
        <div className="max-h-[50vh] overflow-y-auto sm:max-h-[100vh]">
          <div className="space-y-[14px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <ChatsListItemSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "animate-fadeIn shrink-0 h-full w-full max-w-[260px] bg-[#121423] py-[20px] rounded-l-[24px] rounded-r-[8px] transition-all duration-300 md:!rounded-[16px] md:translate-x-0 md:max-w-full",
        {
          "!max-w-[82px] ": collapse,
          "!translate-x-[105%] delay-500": isMobileChatOpen,
        },
      )}
    >
      <div className="flex items-center justify-between px-[20px] mb-[9px]">
        {!collapse && (
          <p className="animate-fadeIn text-[17px] font-medium">Chats</p>
        )}
        <button
          onClick={handleCollapse}
          className="flex items-center justify-center bg-[#191B2C] size-[32px] rounded-[12px] md:hidden"
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
      <div className="max-h-[50vh] overflow-y-auto sm:max-h-[100vh]">
        {mounted && characters && characters?.length > 0 ? (
          characters
            ?.slice()
            .sort(
              (a, b) =>
                +new Date(b.lastMessageTime) - +new Date(a.lastMessageTime),
            )
            .map((character) => {
              return (
                <ChatsListItem
                  key={character.id}
                  id={character.id}
                  collapse={collapse}
                  image={character.image}
                  name={character.name}
                  lastMessage={
                    character.listMsgs?.[character.listMsgs.length - 1]
                  }
                  lastMessageTime={character.lastMessageTime}
                />
              );
            })
        ) : (
          <div className="space-y-[14px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <ChatsListItemSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsList;
