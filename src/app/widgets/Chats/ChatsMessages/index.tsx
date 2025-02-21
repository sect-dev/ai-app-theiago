'use client'
import React, {FC, useEffect, useRef, useState} from "react";
import Image from "next/image";
import IconSend from "@/../public/images/icons/icon-send.svg";
import IconUpload from "@/../public/images/icons/icon-upload.svg";
import IconClose from "@/../public/images/icons/icon-close.svg";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ChatsMessageModal from "@/app/widgets/Chats/ChatsMessages/ChatsMessageModal";
import { sendMessage } from "@/app/shared/api";
import { Character } from "@/app/shared/api/types";
import Spinner from "@/app/widgets/Spinner";
import AudioPlayer from "@/app/widgets/AudioPlayer";
import VideoPlayer from "@/app/widgets/VideoPlayer";

interface FormData {
  message: string;
}

interface Message {
  text: string;
  type: "text" | "video" | "audio";
  url?: string;
  sender: "user" | "bot";
}

interface ComponentProps {
  characterInfo: Character;
}

const ChatsMessages: FC<ComponentProps> = ({ characterInfo }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 👈 Реф для скролла

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Добавляем сообщение пользователя в чат
    const userMessage: Message = { text: data.message, type: "text", sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    setLoading(true);
    const params = {
      userId: "8d9b409fe5287d5b",
      message: data.message,
      characterId: characterInfo.id.toString(),
    };
    try {
      const response = await sendMessage(params);
      if (response?.response?.length > 0) {
        const botMessages = response.response.map((msg: any) => ({
          text: msg.message,
          type: msg.type as "text" | "video" | "audio" | 'image',
          url: msg.url || "",
          sender: "bot",
        }));
        setMessages((prev) => [...prev, ...botMessages]);
      }
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const onReset = () => {
    reset();
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const messageValue = watch("message");

  return (
    <div className="h-full">
      <div className="h-[calc(100%-40px)] space-y-[12px] overflow-auto pb-[20px]">
        {/* Сообщения из characterInfo */}
        {characterInfo.listMsgs.map((item) => (
          <p
            className="animate-fadeIn bg-[#21233A] w-fit py-[10px] px-[20px] text-[14px] font-medium rounded-[20px] rounded-bl-none"
            key={item.en}
          >
            {item.en}
          </p>
        ))}

        {/* Динамический рендер сообщений */}
        {messages.map((msg, index) => {
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
              <Spinner />
            </div>
            <p className="font-medium text-[12px] opacity-50 tracking-[-0.04em]">Typing message</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Форма отправки сообщений */}
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex gap-[8px]">
        {showModal && <ChatsMessageModal closeModal={() => setShowModal(false)} />}
        <div className="relative w-full">
          <textarea
            id="message"
            {...register("message", { required: "Поле обязательно для заполнения" })}
            className="rounded-[16px] bg-[#21233A] w-full p-[12px] leading-[1.2em] h-[48px] text-[14px] pr-[160px] resize-none placeholder:opacity-50 focus:outline-none"
            placeholder="Your message here"
          />
          <button
            onClick={handleModal}
            type="button"
            className="absolute right-[20px] top-1/2 -translate-y-1/2 bg-[#121423] rounded-[9px] flex items-center gap-[6px] h-[24px] px-[9px]"
          >
            <Image src={IconUpload.src} width={IconUpload.width} height={IconUpload.height} alt="upload photos" className="size-[14px]" />
            <span className="font-medium text-[12px]"> Send photo</span>
          </button>
          {messageValue &&
            <button
              onClick={onReset}
              className="animate-fadeIn absolute right-[130px] top-1/2 -translate-y-1/2"
            >
              <Image
                src={IconClose.src}
                width={IconClose.width}
                height={IconClose.height}
                alt="clean form"
                className="size-[24px]"
              />
            </button>
          }
        </div>
        <button
          type="submit"
          disabled={!messageValue?.trim() || isSubmitting}
          className={clsx("size-[48px] flex items-center justify-center rounded-[16px] bg-[#21233A] shrink-0 transition-bg duration-300 hover:bg-[#2E335B] disabled:pointer-events-none", {
            "border border-red-500": errors.message,
            "bg-main-gradient": messageValue
          })}
        >
          <Image src={IconSend.src} width={IconSend.width} height={IconSend.height} alt="send message icon" className={clsx("size-[24px] transition-opacity duration-300 opacity-20",{
            "!opacity-100": messageValue
          })} />
        </button>
      </form>
    </div>
  );
};

export default ChatsMessages;
