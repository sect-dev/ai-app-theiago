"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import IconReload from "@/../public/images/icons/icon-reload.svg";
import Spinner from "@/app/widgets/Spinner";
import clsx from "clsx";
import { generateUserText } from "@/app/shared/api/mesages";
import { marked } from "marked";

interface ComponentProps {
  onSelectMessage: (text: string) => void;
  userId: string | null;
  characterId: number | null;
  waitingMessage: boolean;
}

const SuggestionAnswer: FC<ComponentProps> = ({
  onSelectMessage,
  userId = "id",
  characterId,
  waitingMessage,
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      getRandomAnswer();
    }
  }, [waitingMessage]);

  const getRandomAnswer = async () => {
    try {
      setLoading(true);
      const resp = await generateUserText(userId, characterId);
      setAnswer(resp?.response[0] ?? "");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn bg-[#21233A] p-[8px] rounded-[12px] w-[365px] mb-[8px] md:w-full">
      {loading ? (
        <div className="h-[32px]">
          <Spinner />{" "}
        </div>
      ) : (
        <button
          onClick={() => onSelectMessage(answer)}
          dangerouslySetInnerHTML={{ __html: marked(answer) }}
          className="logo-gradient text-left text-[14px] font-medium line-clamp-2 leading-[1.2em] transition-text duration-300 hover:text-white"
        ></button>
      )}
      <button
        className={clsx("flex items-center gap-[4px] group", {
          "pointer-events-none opacity-20": loading,
        })}
        onClick={getRandomAnswer}
        disabled={loading}
      >
        <span className="text-[12px]">✨</span>
        <span className="text-[12px] font-semibold tracking-[-0.04em] opacity-50 transition-border border-b border-b-transparent duration-300 group-hover:border-b-white">
          {" "}
          Suggestion answer
        </span>
        <Image
          src={IconReload.src}
          width={IconReload.width}
          height={IconReload.height}
          alt="reload image"
        />
      </button>
    </div>
  );
};

export default SuggestionAnswer;
