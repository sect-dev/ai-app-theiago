"use client";
import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";
import IconPlay from "@/../public/images/icons/icon-play.svg";
import IconPause from "@/../public/images/icons/icon-pause.svg";
import IconArrow from "@/../public/images/icons/icon-arrow-translate.svg";
import clsx from "clsx";
import { useMediaStore } from "@/app/shared/store/mediaStore";

interface AudioPlayerProps {
  audioUrl: string;
  text: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, text }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(false);
  const { currentPlaying, setCurrentPlaying } = useMediaStore();
  const audioUrlNoSpace = audioUrl.replace(" ", "%20");
  useEffect(() => {
    if (!containerRef.current) return;

    // Создаем экземпляр wavesurfer
    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current!,
      waveColor: "#fff",
      progressColor: "#007AFF",
      cursorColor: "transparent",
      barWidth: 2,
      barHeight: 1,
      height: 20,
      minPxPerSec: 5,
      fillParent: true,
    });

    wavesurferRef.current?.load(audioUrlNoSpace);

    wavesurferRef.current?.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      if (wavesurferRef.current && typeof window !== "undefined") {
        wavesurferRef.current?.destroy();
      }
      setCurrentPlaying(null);
    };
  }, [audioUrl]);
  // Функция Play/Pause
  const togglePlay = () => {
    if (wavesurferRef.current) {
      if (!isPlaying) {
        setCurrentPlaying("audio");
        wavesurferRef.current?.playPause();
        setIsPlaying(wavesurferRef.current?.isPlaying());
      } else {
        wavesurferRef.current?.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (currentPlaying === "video" && wavesurferRef.current) {
      wavesurferRef.current?.pause();
      setIsPlaying(false);
    }
  }, [currentPlaying]);

  const handleShowText = () => {
    setShowText(!showText);
  };

  return (
    <div className="w-[250px] rounded-[20px] rounded-bl-none bg-[#21233A] px-[20px] py-[10px]">
      <div className="flex items-center gap-2">
        {/* Кнопка Play/Pause */}
        <button
          className="main-gradient flex size-[32px] shrink-0 items-center justify-center rounded-[12px]"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Image
              src={IconPause.src}
              width={10}
              height={11}
              alt="Pause icon"
              className="relative z-[5]"
            />
          ) : (
            <Image
              src={IconPlay.src}
              width={10}
              height={13}
              alt="Play icon"
              className="relative z-[5]"
            />
          )}
        </button>

        {/* Визуализация аудиоволн */}
        <div
          id={audioUrlNoSpace}
          ref={containerRef}
          className="h-[20px] w-full"
        />

        {/* Кнопка для показа текста */}
        <button
          onClick={handleShowText}
          className="transcribate-button flex h-[20px] w-[24px] shrink-0 items-center justify-center rounded-[5px] px-[4px]"
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
        <p className="animate-fadeIn pt-[10px] text-[14px] font-medium leading-[1.2em] !opacity-50">
          {text}
        </p>
      )}
    </div>
  );
};

export default AudioPlayer;
