'use client'
import React, {useState} from 'react';
import Image from "next/image";
import IconSend from '@/../public/images/icons/icon-send.svg';
import { useForm } from "react-hook-form";

interface FormData {
  message: string;
}

const ChatsMessages = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Отправленные данные:", data);
    const formData = new FormData();
    formData.append("message", data.message);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-[8px]"
      >
        <textarea
          id="message"
          {...register("message", { required: "Поле обязательно для заполнения" })}
          className="rounded-[16px] bg-[#21233A] w-full p-[12px] leading-[1.2em] h-[48px] text-[14px] resize-none placeholder:opacity-50"
          placeholder="Your message here"
        />
        {errors.message && <p className="text-red-500 text-[12px]">{errors.message.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="p-[12px] rounded-[16px] bg-[#21233A] shrink-0"
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