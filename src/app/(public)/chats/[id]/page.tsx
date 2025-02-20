import React, {FC} from 'react';
import ChatsList from "@/app/widgets/Chats/ChatsList";
import ChatsHeader from "@/app/widgets/Chats/ChatsHeader";
import ChatInfo from "@/app/widgets/Chats/ChatInfo";
import {getCharacterInfoById} from "@/app/shared/api";
import ChatsMessages from "@/app/widgets/Chats/ChatsMessages";
import ChatHeaderSkeleton from "@/app/widgets/Chats/ChatsHeader/ChatHeaderSkeleton";
import ChatsListSkeleton from "@/app/widgets/Chats/ChatsList/ChatsListSkeleton";
import ChatsMessagesSkeleton from "@/app/widgets/Chats/ChatsMessages/ChatsMessagesSkeleton";
import ChatsInfoSkeleton from "@/app/widgets/Chats/ChatInfo/ChatsInfoSkeleton";

interface ComponentProps {
  params: Promise<{ id: string }>;
}

const Page:FC<ComponentProps> = async ({params}) => {
  const { id } = await params
  const characterInfo = await getCharacterInfoById(+id)

  return (
    <div>
      <div className="flex gap-[12px] pr-[12px] md:px-[8px]">
        {(characterInfo && Object.keys(characterInfo).length > 0) &&
          <ChatsList characterInfo={characterInfo} />
        }
        <div className="w-full space-y-[8px]">
          {(characterInfo && Object.keys(characterInfo).length > 0)
            ? <ChatsHeader avatar={characterInfo.avatar} name={characterInfo.name} />
            : <ChatHeaderSkeleton />
          }
          <div className="flex flex-col justify-end p-[20px] rounded-[8px] bg-[#121423] h-[calc(100vh-142px)]">
            {(characterInfo && Object.keys(characterInfo).length > 0)
              ? <ChatsMessages />
              : <ChatsMessagesSkeleton />
            }
          </div>
        </div>
        {(characterInfo && Object.keys(characterInfo).length > 0)
          ? <ChatInfo characterInfo={characterInfo} />
          : <ChatsInfoSkeleton />
        }
      </div>
    </div>
  );
};

export default Page;