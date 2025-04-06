'use client'
import React, {FC, useEffect} from 'react';
import ChatsHeader from "@/app/widgets/Chats/ChatsHeader";
import ChatsMessages from "@/app/widgets/Chats/ChatsMessages";
import {Character} from "@/app/shared/api/types";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import clsx from "clsx";
import {useParams} from "next/navigation";

interface ComponentProps {
  characterInfo: Character | null
}

const ChatsContent:FC<ComponentProps> = ({characterInfo}) => {
  const { setMobileChatOpen, isMobileChatOpen } = useSelectedCardStore();
  const params = useParams()

  useEffect(() => {
    if (params.id && window.innerWidth < 1020) {
      setMobileChatOpen(true)
    }
  },[])

  return (
    <div className={clsx("w-full space-y-[8px] transition-all duration-300 md:absolute md:h-full md:left-0 md:top-0 md:w-full md:-translate-x-[105%]", {
      "md:!translate-x-0": isMobileChatOpen
    })}>
      <ChatsHeader avatar={characterInfo?.avatar ?? null} name={characterInfo?.name ?? null} />
      <ChatsMessages characterInfo={characterInfo} />
    </div>
  );
};

export default ChatsContent;