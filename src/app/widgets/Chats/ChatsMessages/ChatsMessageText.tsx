import React, {FC, useEffect, useRef} from 'react';
import Image from "next/image";
import VideoPlayer from "@/app/widgets/VideoPlayer";
import AudioPlayer from "@/app/widgets/AudioPlayer";
import clsx from "clsx";
import MessageLoading from "@/app/widgets/MessageLoading";
import {Character, Message} from "@/app/shared/api/types";
import {marked} from "marked";

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
      {/* Видео сообщение */}
      {messages?.map((msg, index) => {
        {/* Video-message */}
        if(msg.type === "video" || msg.type === "video_paywall")  {
          return (
            <VideoPlayer key={index} url={msg.url ?? ''} text={msg.text ?? ''} />
          )
        }
        {/* Audio-message */}
        if(msg.type === "audio" || msg.type === "audio_paywall") {
          return  (
            <AudioPlayer key={index} audioUrl={msg.url ?? ''} text={msg.text} />
          )
        }
        {/* Image-message */}
        if(msg.type === "image" || msg.type === "image_paywall") {
          return  (
            <div key={index} className="relative w-[240px] h-[300px] overflow-hidden rounded-[20px] rounded-bl-none">
              <Image
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 240px"
                fill
                src={msg.url ?? ''}
                alt="image"
                className="object-cover object-top"
              />
            </div>
          )
        }
        return (
          <div
            key={index}
             className={clsx("animate-fadeIn w-fit max-w-[80%] py-[10px] px-[20px] text-[14px] font-medium rounded-[20px]", {
               "bg-main-gradient text-white rounded-br-none ml-auto": msg.sender === "user",
               "bg-[#21233A] rounded-bl-none": msg.sender === "bot",
             })}
          >
            {msg.type === "text" && <div dangerouslySetInnerHTML={{__html: marked(msg.text)}} />}
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