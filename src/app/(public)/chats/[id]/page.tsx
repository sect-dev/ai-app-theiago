import React, { Suspense } from "react";
import ChatsList from "@/app/widgets/Chats/ChatsList";
import ChatHeaderSkeleton from "@/app/widgets/Chats/ChatsHeader/ChatHeaderSkeleton";
import ChatsMessagesSkeleton from "@/app/widgets/Chats/ChatsMessages/ChatsMessagesSkeleton";
import ChatsInfoSkeleton from "@/app/widgets/Chats/ChatInfo/ChatsInfoSkeleton";
import ChatsListSkeleton from "@/app/widgets/Chats/ChatsList/ChatsListSkeleton";
import ChatsContent from "@/app/widgets/Chats/ChatsContent";
import ChatInfo from "@/app/widgets/Chats/ChatInfo";
import {getCharacterInfoById} from "@/app/shared/api/characters";
import {getTokensInfo} from "@/app/shared/api/payment";

const fetchCharacterInfo = React.cache(getCharacterInfoById);

const CharacterContent = async ({ id }: { id: string }) => {
  const characterInfo = await fetchCharacterInfo(id);
  return (
    <>
      <ChatsList />
      <ChatsContent characterInfo={characterInfo} />
      <ChatInfo characterInfo={characterInfo} />
    </>
  );
};

interface ComponentProps {
  params: Promise<{ id: string }>;
}

const Page = async ({params}:ComponentProps) => {
  const { id } = await params

  return (
    <div className="relative flex gap-[12px] pr-[12px] md:px-[8px] md:flex-col">
      <Suspense fallback={
        <div className="w-full">
          <div className="flex gap-[12px] md:px-[8px] md:flex-col">
            <div className="md:hidden w-full max-w-[260px]">
              <ChatsListSkeleton />
            </div>
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