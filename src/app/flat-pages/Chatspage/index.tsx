'use client'
import React  from "react";
import Image from "next/image";
import ImageEmptyChat from '@/../public/images/img/img-no-chat.svg';
import Link from "next/link";
import ChatsList from "@/app/widgets/Chats/ChatsList";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

const Chatspage = () => {
    const {characters} = useSelectedCardStore()
    if (characters) {
      return <ChatsList />
    } else {
      return (
        <div className="w-[calc(100vw-87px)] ml-auto animate-fadeIn h-[calc(100%-24px)] bg-[#121423] p-[24px] mr-[12px] rounded-[24px] md:p-[16px] md:rounded-[16px] md:w-full sm:h-auto">
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
      );
    }

};

export default Chatspage;