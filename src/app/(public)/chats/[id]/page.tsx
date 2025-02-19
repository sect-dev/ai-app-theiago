import React, {FC} from 'react';
import ChatsList from "@/app/widgets/Chats/ChatsList";
import ChatsHeader from "@/app/widgets/Chats/ChatsHeader";
import ChatInfo from "@/app/widgets/Chats/ChatInfo";
import {getCharacterInfoById} from "@/app/shared/api";
import ChatsMessages from "@/app/widgets/Chats/ChatsMessages";

interface ComponentProps {
  params: Promise<{ category: string }>;
}

const Page:FC<ComponentProps> = async ({params}) => {
  const { id } = await params
  const characterInfo = await getCharacterInfoById(id)

  return (
    <div>
      <div className="flex gap-[12px] pr-[12px] md:px-[8px]">
        <ChatsList />
        <div className="w-full space-y-[8px]">
          <ChatsHeader avatar={characterInfo.avatar} name={characterInfo.name} />
          <div className="flex flex-col justify-end p-[20px] rounded-[8px] bg-[#121423] h-[calc(100vh-142px)]">
            <ChatsMessages />
          </div>
        </div>
        <ChatInfo characterInfo={characterInfo} />
      </div>
    </div>
  );
};

export default Page;