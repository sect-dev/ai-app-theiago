import React, {FC} from 'react';
import Image from "next/image";
import clsx from "clsx";
import {useParams,useRouter} from "next/navigation"

interface ComponentProps {
  id: number
  collapse: boolean
  image: string
  name: string
  lastMessage: string
}

const ChatsListItem: FC<ComponentProps> = ({id, collapse, image, name, lastMessage}) => {
  const router = useRouter()
  const params = useParams()

  const handleChatChange = (chatId: number) => {
    router.push(`/chats/${chatId}`);
  }

  return (
    <button
      key={id}
      onClick={() => handleChatChange(id)}
      className={clsx("flex w-full  transition-bg duration-300 px-[20px] py-[6px] md:px-[16px] md:w-full", {
        "bg-[#0680E642]": (params?.id && +id === +params?.id)
      })}
    >
       <span className="flex items-center gap-[8px] md:w-full">
        <span className="relative">
        <span className="relative block overflow-hidden rounded-[16px] size-[42px]">
          <Image
            src={image}
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
              <span className="font-medium text-[12px] max-w-[125px] opacity-50 line-clamp-1 tracking-[-0.04em]">
                 {lastMessage}
              </span>
             </span>
             )}
      </span>
      {!collapse && (
        <span className="animate-fadeIn flex flex-col items-end pl-[5px] ">
          <span className="text-[12px] font-medium tracking-[-0.04em]">16:44</span>
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