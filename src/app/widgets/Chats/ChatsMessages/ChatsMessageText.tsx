'use client'
import React, {FC, useEffect, useRef, useState} from 'react';
import Image from "next/image";
import VideoPlayer from "@/app/widgets/VideoPlayer";
import AudioPlayer from "@/app/widgets/AudioPlayer";
import clsx from "clsx";
import MessageLoading from "@/app/widgets/MessageLoading";
import {Character, Message} from "@/app/shared/api/types";
import {marked} from "marked";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ComponentProps {
  messages: Message[] | null
  loading: boolean
  characterInfo: Character | null
}

const ChatsMessageText:FC<ComponentProps> = ({messages,loading, characterInfo}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState<{src: string}[]>([]);

  useEffect(() => {
    if (messages) {
      const allImages = messages
        .filter(msg => msg.type.includes('image'))
        .map(msg => ({
          src: typeof msg.url === "string" ? msg.url : msg.url?.en ?? ''
        })).filter(Boolean) as {src: string}[];

      setSlides(allImages);
    }
  }, [messages]);

  // Функция открытия Lightbox с конкретным изображением
  const openLightbox = (index: number) => {
    setCurrentSlideIndex(index);
    setLightboxOpen(true);
  };

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
          const url = typeof msg.url === "string" ? msg.url : msg.url?.en ?? '';
          return (
            <VideoPlayer key={index} url={url ?? ''} text={msg.text ?? ''} />
          )
        }
        {/* Audio-message */}
        if(msg.type === "audio" || msg.type === "audio_paywall") {
          const url = typeof msg.url === "string" ? msg.url : msg.url?.en ?? '';
          return  (
            <AudioPlayer key={index} audioUrl={url} text={msg.text} />
          )
        }
        {/* Image-message */}
        if(msg.type === "image" || msg.type === "image_paywall") {
          const src = typeof msg.url === "string" ? msg.url : msg.url?.en ?? '';
          if (!src) return null;
          const imageIndex = slides.findIndex(slide => slide.src === src);

          return  (
            <div onClick={() => openLightbox(imageIndex)} key={index} className="relative w-[240px] h-[350px] overflow-hidden rounded-[20px] rounded-bl-none">
              <Image
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 240px"
                fill
                src={src}
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
            {(msg.type === "text" || msg.type === "text_paywall") && <div dangerouslySetInnerHTML={{__html: marked(msg.text)}} />}
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
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={currentSlideIndex}
      />
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatsMessageText;