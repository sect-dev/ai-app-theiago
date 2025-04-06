import React, {FC} from 'react';
import Image from "next/image";
import clsx from "clsx";
import {useParams,useRouter} from "next/navigation"
import {Message} from "@/app/shared/api/types";
import LastMessage from "@/app/widgets/Chats/ChatsList/LastMessage";

interface ComponentProps {
  id: number | string
  collapse: boolean
  image: string
  name: string
  lastMessage: Message
  lastMessageTime: Date
}

const ChatsListItem: FC<ComponentProps> = ({id, collapse, image, name, lastMessage,lastMessageTime}) => {
  const router = useRouter()
  const params = useParams()

  const handleChatChange = (chatId: number | string) => {
    router.push(`/chats/${chatId}`);
  }

  const date = new Date(lastMessageTime);
  const formattedTime = date.toLocaleTimeString("ru-RU", {hour: "2-digit", minute: "2-digit"});

  return (
    <button
      key={id}
      onClick={() => handleChatChange(id)}
      className={clsx("flex w-full  transition-bg duration-300 px-[20px] py-[6px] md:px-[16px] md:w-full", {
        "bg-[#0680E642]": (params?.id && id.toString() === params?.id.toString())
      })}
    >
       <span className="flex w-full items-center gap-[8px] md:w-full">
        <span className="relative">
        <span className="relative block overflow-hidden rounded-[16px] size-[42px]">
          <Image
            src={`${image}?format=webp&quality=80&width=50`}
            fill
            sizes="(max-width: 768px) 42px, (max-width: 1200px) 42px, 42px"
            alt="nicole image"
            className="object-cover object-top"
          />
        </span>
          {/*{collapse && (*/}
          {/*  <span*/}
          {/*    className="animate-fadeIn bg-main-gradient absolute right-[-2px] bottom-[-2px] flex items-center justify-center font-semibold text-[11px] rounded-full size-[14px] mt-[8px]">*/}
          {/*  1*/}
          {/*</span>*/}
          {/*)}*/}
        </span>
           {!collapse && (
             <span className="animate-fadeIn text-left">
              <span className="font-medium text-[14px] tracking-[-0.04em] line-clamp-1">{name}</span>
               {lastMessage && (
                 <span className="flex items-center gap-[4px]">
                    <LastMessage message={lastMessage}/>
                 </span>
               )}
            </span>
           )}
      </span>
      {!collapse && (
        <span className="animate-fadeIn flex flex-col items-end pl-[5px] ">
          <span className="text-[12px] font-medium opacity-50 tracking-[-0.04em]">{formattedTime}</span>
          {/*<span*/}
          {/*  className="bg-main-gradient flex items-center justify-center font-semibold text-[11px] rounded-full size-[14px] mt-[8px]"*/}
          {/*>*/}
          {/*  1*/}
          {/*</span>*/}
        </span>
      )}
    </button>
  );
};

export default ChatsListItem;