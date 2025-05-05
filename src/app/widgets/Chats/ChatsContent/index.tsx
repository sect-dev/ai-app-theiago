"use client";
import React, { FC, useEffect } from "react";
import ChatsHeader from "@/app/widgets/Chats/ChatsHeader";
import ChatsMessages from "@/app/widgets/Chats/ChatsMessages";
import { Character } from "@/app/shared/api/types";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import clsx from "clsx";
import ChatHeaderSkeleton from "@/app/widgets/Chats/ChatsHeader/ChatHeaderSkeleton";
import ChatsMessagesSkeleton from "@/app/widgets/Chats/ChatsMessages/ChatsMessagesSkeleton";

interface ComponentProps {
  characterInfo: Character | null;
}

const ChatsContent: FC<ComponentProps> = ({ characterInfo }) => {
  const { setMobileChatOpen, isMobileChatOpen, selectedCharacterId } =
    useSelectedCardStore();
  useEffect(() => {
    if (
      selectedCharacterId &&
      selectedCharacterId !== "9a9b9" &&
      window.innerWidth < 1020
    ) {
      setMobileChatOpen(true);
    }
  }, [selectedCharacterId]);

  return (
    <div
      className={clsx(
        "w-full space-y-[8px] transition-all duration-300 md:absolute md:left-0 md:top-0 md:h-full md:w-full md:-translate-x-[105%]",
        {
          "md:!translate-x-0 md:delay-500": isMobileChatOpen,
        },
      )}
    >
      {characterInfo ? (
        <ChatsHeader
          avatar={characterInfo?.avatar ?? null}
          name={characterInfo?.name ?? null}
        />
      ) : (
        <ChatHeaderSkeleton />
      )}
      {characterInfo ? (
        <ChatsMessages characterInfo={characterInfo} />
      ) : (
        <ChatsMessagesSkeleton />
      )}
    </div>
  );
};

export default ChatsContent;
