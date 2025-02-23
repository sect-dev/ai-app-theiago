'use client'
import React, {FC, useState} from "react";
import Image from "next/image";
import IconSend from "@/../public/images/icons/icon-send.svg";
import IconUpload from "@/../public/images/icons/icon-upload.svg";
import IconClose from "@/../public/images/icons/icon-close.svg";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ChatsMessageModal from "@/app/widgets/Chats/ChatsMessages/ChatsMessageModal";
import { sendMessage } from "@/app/shared/api";
import { Character } from "@/app/shared/api/types";
import ChatsMessageText from "@/app/widgets/Chats/ChatsMessages/ChatsMessageText";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

interface FormData {
  message: string;
}

export interface Message {
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
  const [messages, setMessages] = useState<Message[] | null>([]);
  const { setTokens } = useSelectedCardStore();

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
        const botMessages = response?.response?.map((msg: any) => ({
          text: msg.message,
          type: msg.type as "text" | "video" | "audio" | 'image',
          url: msg.url || "",
          sender: "bot",
        }));
        setMessages((prev) => [...prev, ...botMessages]);
        setTokens(response?.tokens_remaining || null)
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

  const messageValue = watch("message");

  return (
    <div className="h-full">
      <div className="h-[calc(100%-40px)] space-y-[12px] overflow-auto pb-[20px]">
        <ChatsMessageText loading={loading} messages={messages} characterInfo={characterInfo} />
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
