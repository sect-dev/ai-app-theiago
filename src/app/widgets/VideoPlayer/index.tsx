import React, { FC, useRef, useState } from 'react';
import IconPlay from '@/../public/images/icons/icon-play.svg';
import Image from "next/image";
import clsx from "clsx";
import IconArrow from "@/../public/images/icons/icon-arrow-translate.svg";
import {marked} from "marked";

interface ComponentProps {
  url: string;
  text: string
}

const VideoPlayer: FC<ComponentProps> = ({ url,text }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleShowText = () => {
    setShowText(true);
  };

  return (
    <>
      <div className="flex items-end gap-[8px]">
        <div className="w-[240px] h-[300px] overflow-hidden rounded-[20px] rounded-bl-none">
          <div className={clsx("chatInfoImage relative size-full", {
            "before:!opacity-0": isPlaying
          })}>
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              controls={false}
              onEnded={() => setIsPlaying(false)}
              className="size-full rounded-lg object-cover object-top"
            >
              <source src={url} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>

            <div className="absolute inset-0 flex items-center justify-center z-[3]">
              {!isPlaying &&
              <button
                onClick={togglePlayPause}
                className=""
              >
                <Image
                  src={IconPlay.src}
                  width={IconPlay.width}
                  height={IconPlay.height}
                  alt="icon play"
                  className="size-[39px]"
                />
              </button>
              }
            </div>

          </div>
        </div>
        <button
          onClick={handleShowText}
          className="transcribate-button w-[24px] h-[20px] px-[4px] flex items-center justify-center rounded-[5px]"
        >
          <Image
            src={IconArrow.src}
            width={5}
            height={10}
            alt="icon arrow"
            className={clsx("w-[5px] h-[10px]transition-transform duration-300", { "rotate-[-90deg]": showText })}
          />
          {!showText && (
            <span className="text-[#0680E6] font-medium text-[12px]">A</span>
          )}
        </button>
      </div>

      {showText && (
        <p
          className="animate-fadeIn w-[210px] text-[14px] !opacity-50 font-medium leading-[1.2em]"
          dangerouslySetInnerHTML={{__html:marked(text)}}
        />
      )}
    </>
  );
};

export default VideoPlayer;