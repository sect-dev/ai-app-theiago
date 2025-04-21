"use client";
import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";
import IconPlay from '@/../public/images/icons/icon-play.svg';
import IconPause from '@/../public/images/icons/icon-pause.svg';
import IconArrow from '@/../public/images/icons/icon-arrow-translate.svg';
import clsx from "clsx";
import {useMediaStore} from "@/app/shared/store/mediaStore";

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
  const audioUrlNoSpace = audioUrl.replace(' ', '%20');
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
      if(wavesurferRef.current && typeof window !== 'undefined') {
        wavesurferRef.current?.destroy();
      }
      setCurrentPlaying(null);
    };
  }, [audioUrl]);
  // Функция Play/Pause
  const togglePlay = () => {
    if (wavesurferRef.current) {
      if (!isPlaying) {
        setCurrentPlaying('audio');
        wavesurferRef.current?.playPause();
        setIsPlaying(wavesurferRef.current?.isPlaying());
      } else {
        wavesurferRef.current?.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (currentPlaying === 'video' && wavesurferRef.current) {
      wavesurferRef.current?.pause();
      setIsPlaying(false);
    }
  }, [currentPlaying]);


  const handleShowText = () => {
    setShowText(!showText);
  };

  return (
    <div className="py-[10px] px-[20px] w-[250px] bg-[#21233A] rounded-[20px] rounded-bl-none">
      <div className="flex items-center gap-2">
        {/* Кнопка Play/Pause */}
        <button
          className="main-gradient size-[32px] rounded-[12px] shrink-0 flex items-center justify-center"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Image src={IconPause.src} width={10} height={11} alt="Pause icon" className="relative z-[5]" />
          ) : (
            <Image src={IconPlay.src} width={10} height={13} alt="Play icon" className="relative z-[5]" />
          )}
        </button>

        {/* Визуализация аудиоволн */}
        <div id={audioUrlNoSpace} ref={containerRef} className="w-full h-[20px]" />

        {/* Кнопка для показа текста */}
        <button
          onClick={handleShowText}
          className="transcribate-button shrink-0 w-[24px] h-[20px] px-[4px] flex items-center justify-center rounded-[5px]"
        >
          <Image
            src={IconArrow.src}
            width={5}
            height={10}
            alt="icon arrow"
            className={clsx("w-[5px] h-[10px] transition-transform duration-300", { "rotate-[-90deg]": showText })}
          />
          {!showText && (
            <span className="text-[#0680E6] font-medium text-[12px]">A</span>
          )}
        </button>
      </div>

      {showText && (
        <p className="animate-fadeIn pt-[10px] text-[14px] !opacity-50 font-medium leading-[1.2em]">{text}</p>
      )}
    </div>
  );
};

export default AudioPlayer;
