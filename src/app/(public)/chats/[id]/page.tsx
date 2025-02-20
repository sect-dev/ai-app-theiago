import React, { Suspense } from "react";
import ChatsList from "@/app/widgets/Chats/ChatsList";
import ChatsHeader from "@/app/widgets/Chats/ChatsHeader";
import ChatInfo from "@/app/widgets/Chats/ChatInfo";
import ChatsMessages from "@/app/widgets/Chats/ChatsMessages";
import { getCharacterInfoById } from "@/app/shared/api";
import ChatHeaderSkeleton from "@/app/widgets/Chats/ChatsHeader/ChatHeaderSkeleton";
import ChatsMessagesSkeleton from "@/app/widgets/Chats/ChatsMessages/ChatsMessagesSkeleton";
import ChatsInfoSkeleton from "@/app/widgets/Chats/ChatInfo/ChatsInfoSkeleton";
import ChatsListSkeleton from "@/app/widgets/Chats/ChatsList/ChatsListSkeleton";

const fetchCharacterInfo = React.cache(getCharacterInfoById);

const CharacterContent = async ({ id }: { id: string }) => {
  const characterInfo = await fetchCharacterInfo(+id);

  return (
    <>
      <ChatsList characterInfo={characterInfo} />
      <div className="w-full space-y-[8px]">
        <ChatsHeader avatar={characterInfo.avatar} name={characterInfo.name} />
        <div className="flex flex-col justify-end p-[20px] rounded-[8px] bg-[#121423] h-[calc(100vh-142px)]">
          <ChatsMessages />
        </div>
      </div>
      <ChatInfo characterInfo={characterInfo} />
    </>
  );
};

const Page = async ({params}) => {
  const { id } = await params

  return (
    <div className="flex gap-[12px] pr-[12px] md:px-[8px]">
      <Suspense fallback={
        <div className="w-full">
          <div className="flex gap-[12px] md:px-[8px]">
            <ChatsListSkeleton />
            <div className="w-full space-y-[8px]">
              <ChatHeaderSkeleton />
              <div className="flex flex-col justify-end p-[20px] rounded-[8px] bg-[#121423] h-[calc(100vh-142px)]">
                <ChatsMessagesSkeleton />
              </div>
            </div>
            <ChatsInfoSkeleton />
          </div>
        </div>
      }>
        <CharacterContent id={id} />
      </Suspense>
    </div>
  );
};

export default Page;