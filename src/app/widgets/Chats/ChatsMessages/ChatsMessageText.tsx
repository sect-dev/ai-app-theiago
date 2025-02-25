import React, {FC, useEffect, useRef} from 'react';
import Image from "next/image";
import VideoPlayer from "@/app/widgets/VideoPlayer";
import AudioPlayer from "@/app/widgets/AudioPlayer";
import clsx from "clsx";
import MessageLoading from "@/app/widgets/MessageLoading";
import {Message} from "@/app/widgets/Chats/ChatsMessages/index";
import {Character} from "@/app/shared/api/types";

interface ComponentProps {
  messages: Message[] | null
  loading: boolean
  characterInfo: Character | null
}

const ChatsMessageText:FC<ComponentProps> = ({messages,loading, characterInfo}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(messages && messages?.length > 2) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <>
      {/* Сообщения из characterInfo */}
      {characterInfo?.listMsgs.map((item) => (
        <p
          className="animate-fadeIn bg-[#21233A] w-fit py-[10px] px-[20px] text-[14px] font-medium rounded-[20px] rounded-bl-none"
          key={item.en}
        >
          {item.en}
        </p>
      ))}

      {/* Динамический рендер сообщений */}
      {messages?.map((msg, index) => {
        {/* Видео-сообщение */}
        if(msg.type === "video")  {
          return (
            <VideoPlayer key={index} url={msg.url ?? ''} text={msg.text ?? ''} />
          )
        }
        {/* Аудио-сообщение */}
        if(msg.type === "audio") {
          return  (
            <AudioPlayer key={index} audioUrl={msg.url ?? ''} text={msg.text} />
          )
        }
        {/* Аудио-сообщение */}
        if(msg.type === "image") {
          return  (
            <div key={index} className="relative w-[240px] h-[300px] overflow-hidden rounded-[20px] rounded-bl-none">
              <Image
                key={index}
                fill
                src={msg.url ?? ''}
                alt="image"
                className="object-cover object-top"
              />
            </div>
          )
        }
        return (
          <div key={index}
               className={clsx("animate-fadeIn w-fit max-w-[80%] py-[10px] px-[20px] text-[14px] font-medium rounded-[20px]", {
                 "bg-main-gradient text-white rounded-br-none ml-auto": msg.sender === "user", // Сообщения пользователя (справа)
                 "bg-[#21233A] rounded-bl-none": msg.sender === "bot", // Ответы бота (слева)
               })}>
            {msg.type === "text" && <p>{msg.text}</p>}
          </div>
        )
      })}

      {/* Спиннер загрузки */}
      {loading && (
        <div className="animate-fadeIn space-y-[6px] pt-[32px]">
          <div className="animate-fadeIn flex items-center justify-center bg-[#21233A] w-[80px] h-[28px] text-[14px] font-medium rounded-[20px] rounded-bl-none">
            <MessageLoading />
          </div>
          <p className="font-medium text-[12px] opacity-50 tracking-[-0.04em]">Typing message</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatsMessageText;