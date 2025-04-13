'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import ImageEmptyChat from "../../../../public/images/img/img-no-chat.svg";
import ChatsList from "@/app/widgets/Chats/ChatsList";
import ChatsContent from "@/app/widgets/Chats/ChatsContent";
import ChatInfo from "@/app/widgets/Chats/ChatInfo";

import Link from "next/link";
import ChatsInfoSkeleton from "@/app/widgets/Chats/ChatInfo/ChatsInfoSkeleton";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import {Character} from "@/app/shared/api/types";
import {getCharacterInfoById} from "@/app/shared/api/getCharacterById";

const Page = () => {
  const {selectedCharacterId,setSelectedCharacterId} = useSelectedCardStore()
  const [characterInfo,setCharacterInfo] = useState<Character | null>(null)
  const [loading,setLoading] = useState<boolean>(true)

  const getCharacterInfo = async (id:string) => {
    try {
      setLoading(true)
      if(id && id !== '9a9b9') {
        const response = await getCharacterInfoById(id);
        if(response) {
          setCharacterInfo(response);
          setSelectedCharacterId(response.id);
        }
      } else {
        const chats = localStorage.getItem('chatStartedCharacters')
        if(chats && selectedCharacterId !== '9a9b9') {
          const chatStartedCharacters = JSON.parse(chats);
          const lastChatId = chatStartedCharacters[chatStartedCharacters.length - 1].id;
          const response = await getCharacterInfoById(lastChatId);

          if(response) {
            setCharacterInfo(response)
            setSelectedCharacterId(response.id);
          }
        } else {
          setSelectedCharacterId(null);
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(selectedCharacterId !== '9a9b9') {
      const id = selectedCharacterId ? selectedCharacterId?.toString() : '';
      getCharacterInfo(id)
    }
  }, [selectedCharacterId])


  if(!loading && !characterInfo) {
    return (
      <div className=" ml-auto animate-fadeIn h-[calc(100%-24px)] bg-[#121423] p-[24px] mr-[12px] rounded-[24px] md:p-[16px] md:rounded-[16px] md:w-full sm:h-auto">
        <div className="container h-full md:w-[92vw]">
          <p className="hidden md:block md:mb-[16px] text-[20px] font-medium">Chats</p>
          <div className="flex flex-col items-center h-full justify-center gap-[24px]">
            <Image
              src={ImageEmptyChat.src}
              width={ImageEmptyChat.width}
              height={ImageEmptyChat.height}
              alt="no chat icon"
              className="w-[270px] h-[210px]"
            />
            <div className="text-center max-w-[270px] mx-auto">
              <p className="font-semibold text-[20px] leading-[1.2em]  tracking-[-0,04em] leading-[1.2em] mb-[8px]">No chats yet</p>
              <p className="font-medium text-[14px] opacity-50 mb-[16px]">Start communicating with someone soon! Everyone is waiting for you.</p>
              <Link href="/" className="flex items-center justify-center main-gradient mx-auto w-[140px] px-[16px] py-[8px] font-bold text-[16px] rounded-[8px] md:px-[12px] md:h-[27px] md:text-[14px]">
                <span className="relative z-[5]">Find someone</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

   return (
     <div className="relative flex gap-[12px] pr-[12px] md:px-[8px] md:flex-col">
       <ChatsList characterInfo={characterInfo} />
       <ChatsContent characterInfo={characterInfo} />
       {characterInfo
         ? <ChatInfo characterInfo={characterInfo} />
         : <div className="block md:hidden">
           <ChatsInfoSkeleton />
         </div>
       }
     </div>
   );


  // return (
  //   <div className="w-full">
  //     <div className="flex gap-[12px] md:flex-col">
  //       <div className="md:hidden w-full max-w-[260px] max-h-[calc(50vh+40px)]">
  //         <ChatsListSkeleton />
  //       </div>
  //       <div className="w-full space-y-[8px]">
  //         <ChatHeaderSkeleton />
  //         <div className="flex flex-col justify-end p-[20px] rounded-[8px] bg-[#121423] h-[calc(100vh-142px)]">
  //           <ChatsMessagesSkeleton />
  //         </div>
  //       </div>
  //       <ChatsInfoSkeleton />
  //     </div>
  //   </div>
  // )

};

export default Page;