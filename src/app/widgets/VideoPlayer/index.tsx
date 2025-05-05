import React, { FC, useEffect, useRef, useState } from "react";
import IconPlay from "@/../public/images/icons/icon-play.svg";
import IconPause from "@/../public/images/icons/icon-pause.svg";
import Image from "next/image";
import clsx from "clsx";
import IconArrow from "@/../public/images/icons/icon-arrow-translate.svg";
import { marked } from "marked";
import { useMediaStore } from "@/app/shared/store/mediaStore";

interface ComponentProps {
  url: string;
  text: string;
}

interface CustomHTMLVideoElement extends HTMLVideoElement {
  _setIsPlaying?: (isPlaying: boolean) => void;
}

const VideoPlayer: FC<ComponentProps> = ({ url, text }) => {
  const videoRef = useRef<CustomHTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(false);
  const {
    currentPlaying,
    setCurrentPlaying,
    currentPlayingVideo,
    setCurrentPlayingVideo,
  } = useMediaStore();

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (currentPlayingVideo && currentPlayingVideo !== videoRef.current) {
      currentPlayingVideo.pause();
      (currentPlayingVideo as CustomHTMLVideoElement)._setIsPlaying?.(false);
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setCurrentPlayingVideo(null);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setCurrentPlaying("video");
      setCurrentPlayingVideo(videoRef.current);
      (videoRef.current as CustomHTMLVideoElement)._setIsPlaying = setIsPlaying;
    }
  };

  useEffect(() => {
    if (currentPlaying === "audio" && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setCurrentPlayingVideo(null);
    }
  }, [currentPlaying]);

  useEffect(() => {
    if (currentPlayingVideo !== videoRef.current) {
      setIsPlaying(false);
    }
  }, [currentPlayingVideo]);

  return (
    <>
      <div className="flex items-end gap-[8px]">
        <div className="h-[300px] w-[240px] overflow-hidden rounded-[20px] rounded-bl-none">
          <div
            className={clsx("chatInfoImage relative size-full", {
              "before:!opacity-0": isPlaying,
            })}
          >
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              controls={false}
              onEnded={() => {
                setIsPlaying(false);
                setCurrentPlayingVideo(null);
              }}
              className="size-full rounded-lg object-cover object-top"
            >
              <source src={url} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>

            <div className="absolute inset-0 z-[3] flex items-center justify-center">
              <button onClick={togglePlayPause}>
                {!isPlaying ? (
                  <Image
                    src={IconPlay.src}
                    width={39}
                    height={39}
                    alt="icon play"
                  />
                ) : (
                  <Image
                    src={IconPause.src}
                    width={39}
                    height={39}
                    alt="icon pause"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowText(!showText)}
          className="transcribate-button flex h-[20px] w-[24px] items-center justify-center rounded-[5px] px-[4px]"
        >
          <Image
            src={IconArrow.src}
            width={5}
            height={10}
            alt="icon arrow"
            className={clsx(
              "h-[10px] w-[5px] transition-transform duration-300",
              { "rotate-[-90deg]": showText },
            )}
          />
          {!showText && (
            <span className="text-[12px] font-medium text-[#0680E6]">A</span>
          )}
        </button>
      </div>

      {showText && (
        <p
          className="w-[210px] animate-fadeIn text-[14px] font-medium leading-[1.2em] !opacity-50"
          dangerouslySetInnerHTML={{ __html: marked(text) }}
        />
      )}
    </>
  );
};

export default VideoPlayer;
