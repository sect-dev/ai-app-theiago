'use client'
import React, { FC, useEffect, useRef, useState } from 'react';
import Image from "next/image";
import VideoPlayer from "@/app/widgets/VideoPlayer";
import AudioPlayer from "@/app/widgets/AudioPlayer";
import clsx from "clsx";
import MessageLoading from "@/app/widgets/MessageLoading";
import { Character, Message } from "@/app/shared/api/types";
import { marked } from "marked";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ComponentProps {
  messages: Message[] | null;
  loading: boolean;
  characterInfo: Character | null;
}

interface Slide {
  src: string;
  mediaType: 'image' | 'video';
}

const ChatsMessageText: FC<ComponentProps> = ({ messages, loading, characterInfo }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    if (messages) {
      const mediaSlides: Slide[] = messages
    .filter(msg => ['image', 'image_paywall', 'video', 'video_paywall'].includes(msg.type))
    .map(msg => ({
      src: typeof msg.url === "string" ? msg.url : msg.url?.en ?? '',
      mediaType: msg.type.startsWith('video') ? 'video' as const : 'image' as const
    }))
    .filter(slide => slide.src);

      setSlides(mediaSlides);
    }
  }, [messages]);

  const openLightbox = (event:React.MouseEvent<HTMLDivElement>,index: number) => {
    event.stopPropagation()
    setCurrentSlideIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col-reverse gap-[12px] h-full overflow-y-auto">
      {/* Loader */}
      {loading && (
        <div className="animate-fadeIn space-y-[6px] pt-[32px]">
          <div className="animate-fadeIn flex items-center justify-center bg-[#21233A] w-[80px] h-[28px] text-[14px] font-medium rounded-[20px] rounded-bl-none">
            <MessageLoading />
          </div>
          <p className="font-medium text-[12px] opacity-50 tracking-[-0.04em]">Typing message</p>
        </div>
      )}
      {messages?.map((msg, index) => {
        // VIDEO
        if (msg.type === "video" || msg.type === "video_paywall") {
          const url = typeof msg.url === "string" ? msg.url : msg.url?.en ?? '';
          if (!url) return null;
          const videoIndex = slides.findIndex(slide => slide.src === url && slide.mediaType === 'video');

          return (
            <div key={index} className="cursor-pointer" onClick={(event) => openLightbox(event,videoIndex)}>
              <VideoPlayer url={url} text={msg.text ?? ''} />
            </div>
          );
        }

        // AUDIO
        if (msg.type === "audio" || msg.type === "audio_paywall") {
          const url = typeof msg.url === "string" ? msg.url : msg.url?.en ?? '';
          return (
            <AudioPlayer key={index} audioUrl={url} text={msg.text} />
          );
        }

        // IMAGE
        if (msg.type === "image" || msg.type === "image_paywall") {
          const src = typeof msg.url === "string" ? msg.url : msg.url?.en ?? '';
          if (!src) return null;
          const imageIndex = slides.findIndex(slide => slide.src === src && slide.mediaType === 'image');

          return (
            <div
              key={index}
              onClick={(event) => openLightbox(event,imageIndex)}
              className="relative w-[240px] h-[350px] overflow-hidden rounded-[20px] rounded-bl-none cursor-pointer"
            >
              <Image
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 240px"
                fill
                src={src}
                alt="image"
                className="object-cover object-top"
              />
            </div>
          );
        }

        // TEXT
        return (
          <div
            key={index}
            className={clsx("animate-fadeIn w-fit max-w-[80%] py-[10px] px-[20px] text-[14px] font-medium rounded-[20px]", {
              "bg-main-gradient text-white rounded-br-none ml-auto": msg.sender === "user",
              "bg-[#21233A] rounded-bl-none": msg.sender === "bot",
            })}
          >
            {(msg.type === "text" || msg.type === "text_paywall") && (
              <div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
            )}
          </div>
        );
      })}
      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={currentSlideIndex}
        render={{
          slide: ({ slide }) => {
            const typedSlide = slide as Slide;
            if (typedSlide.mediaType === 'video') {
              return (
                <video
                  controls
                  autoPlay={false}
                  className="max-w-full max-h-full m-auto rounded-[20px]"
                  src={typedSlide.src}
                />
              );
            }
            return undefined;
          }
        }}
      />

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatsMessageText;
