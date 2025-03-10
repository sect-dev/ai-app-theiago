'use client'
import React, {FC, useEffect, useRef, useState} from "react";
import Image from "next/image";
import IconSend from "@/../public/images/icons/icon-send.svg";
import IconUpload from "@/../public/images/icons/icon-upload.svg";
import IconUploadGradient from "@/../public/images/icons/icon-upload-gradient.svg";
import IconClose from "@/../public/images/icons/icon-close.svg";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ChatsMessageModal from "@/app/widgets/Chats/ChatsMessages/ChatsMessageModal";
import { sendMessage } from "@/app/shared/api/mesages";
import {Character, Message, PreparedAvatar} from "@/app/shared/api/types";
import ChatsMessageText from "@/app/widgets/Chats/ChatsMessages/ChatsMessageText";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import SuggestionAnswer from "@/app/widgets/SuggestionAnswer";
import {useAuthStore} from "@/app/shared/store/authStore";

interface FormData {
  message: string;
}

interface BotMessage {
  message: string;
  type: "text" | "video" | "audio" | "image";
  url?: string;
}

interface ComponentProps {
  characterInfo: Character | null;
}

const ChatsMessages: FC<ComponentProps> = ({ characterInfo }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[] | null>([]);
  const { setTokens,characters,setCharacters } = useSelectedCardStore();
  const {user} = useAuthStore()
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    watch
  } = useForm<FormData>();

  useEffect(() => {
    if (characters) {
      const character = characters.find((char: PreparedAvatar) => char.id === characterInfo?.id);
      if (character) {
        setMessages(character.listMsgs || []);
      }
    }
  }, [characterInfo]);

  const saveMessagesToLocalStorage = (newMessages: Message[]) => {
    if (!characterInfo) return;
    const storedData = localStorage.getItem("chatStartedCharacters");
    const characters = storedData ? JSON.parse(storedData) : [];

    const characterIndex = characters.findIndex((char: Character) => char.id === characterInfo.id);
    const currentTime = new Date()

    if (characterIndex !== -1) {
      const character = characters[characterIndex];
      character.listMsgs = newMessages;
      character.lastMessageTime = currentTime;

      newMessages.forEach((message) => {
        if (message.sender === "bot" && message.type === "image" && message.url) {
          character.photos = character.photos || [];
          if (!character.photos.includes(message.url)) {
            character.photos.unshift(message.url);
          }
        }
        if (message.type === "video") {
          character.videos = character.videos || [];
          if (!character.videos.includes(message.url)) {
            character.videos.unshift(message.url);
          }
        }
      });
    }

    localStorage.setItem("chatStartedCharacters", JSON.stringify(characters));
    setCharacters(characters)
  };

  const onSubmit = async (data: FormData) => {
    const userMessage: Message = { text: data.message, type: "text", sender: "user" };
    const updatedMessages = [...(messages ?? []), userMessage];
    setMessages(updatedMessages);
    saveMessagesToLocalStorage(updatedMessages);
    reset();

    setLoading(true);
    const params = {
      userId: user?.uid ?? 'id',
      message: data.message,
      characterId: characterInfo?.id.toString() ?? '',
    };
    try {
      const response = await sendMessage(params);
      if (response &&response?.response?.length > 0) {
        const botMessages = response?.response?.map((msg: BotMessage) => ({
          text: msg.message,
          type: msg.type,
          url: msg.url || "",
          sender: "bot" as const,
        }));
        const updatedWithBotMessages = [...updatedMessages, ...botMessages];
        setMessages(updatedWithBotMessages);
        saveMessagesToLocalStorage(updatedWithBotMessages);

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

  const handleSelectMessage = (text: string) => {
    setValue("message", text);
    setShowModal(false);
    setFocus("message")
  };

  const onReset = () => reset();

  const messageValue = watch("message");

  return (
    <div className={clsx("flex flex-col justify-end p-[20px] rounded-[8px] bg-[#121423] h-[calc(100vh-142px)] transition-transform duration-300  md:rounded-[16px] md:py-[14px] md:px-[12px] ", {})}>
      <div className="h-full flex flex-col justify-between">
      <div className="space-y-[12px] overflow-auto pb-[20px]">
        <ChatsMessageText loading={loading} messages={messages} characterInfo={characterInfo} />
      </div>
      <div>
        {!loading && (
          <div className={clsx("transition-opacity duration-300",{"opacity-0 pointer-events-none absolute": loading})}>
            <SuggestionAnswer waitingMessage={loading} userId={user?.uid ?? 'id'} characterId={characterInfo?.id ?? null} onSelectMessage={handleSelectMessage}/>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="relative flex gap-[8px]">
          {showModal && <ChatsMessageModal onSelectMessage={handleSelectMessage} closeModal={() => setShowModal(false)} />}
          <div className="relative w-full">
          <textarea
            {...register("message", { required: "Поле обязательно для заполнения" })}
            ref={(e) => {
              register("message").ref(e);
              textAreaRef.current = e;
            }}
            id="message"
            className="block rounded-[16px] bg-[#21233A] w-full p-[12px] leading-[1.5em] h-[48px] text-[14px] pr-[160px] placeholder:text-[14px] resize-none placeholder:opacity-50 focus:outline-none md:pr-[135px]"
            placeholder="Your message here"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (messageValue?.trim() && !loading) {
                  handleSubmit(onSubmit)();
                }
              }
            }}
          />
            <button
              onClick={handleModal}
              type="button"
              className={clsx("absolute right-[20px] top-1/2 -translate-y-1/2 bg-[#121423] rounded-[9px] flex items-center gap-[6px] h-[24px] px-[9px]", {
                "gradient-border": showModal
              })}
            >
              <Image src={showModal ? IconUploadGradient : IconUpload.src} width={IconUpload.width} height={IconUpload.height} alt="upload photos" className="size-[14px]" />
              <span className={clsx("font-medium text-[12px]", {
                "logo-gradient": showModal
              })}> Send photo</span>
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
            disabled={!messageValue?.trim() || loading}
            className={clsx("size-[48px] flex items-center justify-center rounded-[16px] bg-[#21233A] shrink-0 transition-bg duration-300 hover:bg-[#2E335B] disabled:pointer-events-none", {
              "bg-main-gradient": (messageValue?.trim() && !loading)
            })}
          >
            <Image src={IconSend.src} width={IconSend.width} height={IconSend.height} alt="send message icon" className={clsx("size-[24px] transition-opacity duration-300 opacity-20",{
              "!opacity-100": (messageValue?.trim() && !loading)
            })} />
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ChatsMessages;
