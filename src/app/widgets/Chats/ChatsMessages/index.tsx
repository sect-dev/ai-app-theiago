'use client'
import React, {FC, useState} from 'react';
import Image from "next/image";
import IconSend from '@/../public/images/icons/icon-send.svg';
import IconUpload from '@/../public/images/icons/icon-upload.svg';
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ChatsMessageModal from "@/app/widgets/Chats/ChatsMessages/ChatsMessageModal";
import {sendMessage} from "@/app/shared/api";
import {Character} from "@/app/shared/api/types";

interface FormData {
  message: string;
}

interface ComponentProps {
  characterInfo: Character
}

const ChatsMessages:FC<ComponentProps> = ({characterInfo}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const params = {
      userId: '8d9b409fe5287d5b',
      message: data.message,
      characterId: characterInfo.id.toString()
    }
    try {
      const reps = await sendMessage(params)
      console.log('reps',reps)
    } catch (error) {
      console.log('error',error)
    }
  };

  const handleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="h-full">
      <div className="h-[calc(100%-40px)] space-y-[12px]">
        {characterInfo.listMsgs.map(item => {
          return (
            <p
              className="animate-fadeIn bg-[#21233A] w-fit py-[10px] px-[20px] text-[14px] font-medium rounded-[20px] rounded-bl-none"
              key={item.en}
            >
              {item.en}
            </p>
          )
        })}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex gap-[8px]"
      >
        {showModal && <ChatsMessageModal closeModal={() => setShowModal(false)} />}

        <div className="relative w-full">
          <textarea
            id="message"
            {...register("message", { required: "Поле обязательно для заполнения" })}
            className="rounded-[16px] bg-[#21233A] w-full p-[12px] leading-[1.2em] h-[48px] text-[14px] resize-none placeholder:opacity-50"
            placeholder="Your message here"
          />
          <button onClick={handleModal} className="absolute right-[20px] top-1/2 -translate-y-1/2 bg-[#121423] rounded-[9px] flex items-center gap-[6px] h-[24px] px-[9px]">
            <Image
              src={IconUpload.src}
              width={IconUpload.width}
              height={IconUpload.height}
              alt="upload photos"
              className="size-[14px]"
            />
            <span className="font-medium text-[12px]"> Send photo</span>
          </button>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx("size-[48px] flex items-center justify-center rounded-[16px] bg-[#21233A] shrink-0 transition-bg duration-300 hover:bg-[#2E335B]", {
            "border border-red-500": errors.message
          })}
        >
          <Image
            src={IconSend.src}
            width={IconSend.width}
            height={IconSend.height}
            alt="send message icon"
            className="size-[24px]"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatsMessages;