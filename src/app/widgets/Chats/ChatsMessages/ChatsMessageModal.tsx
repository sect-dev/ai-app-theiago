import React, { FC, useRef } from "react";
import { useClickOutside } from "@/app/shared/hooks/useClickOutside";

const photoPrompt = [
  {
    title: "Breasts ",
    value: "Show me your gorgeous naked breasts please",
    id: 1,
    image: "🍒",
  },
  {
    title: "Butt ",
    value: "Send me a photo of your beautiful butt please",
    id: 2,
    image: "🌰",
  },
  {
    title: "Pussy ",
    value:
      "Send me a photo of how you are lying on your back and masturbating your wet dripping pussy please",
    id: 3,
    image: "🐱",
  },
  {
    title: "Sex ",
    value:
      "Send me a photo how you are enjoying hot and passionate sexual intercourse in a cowgirl pose please",
    id: 4,
    image: "🔞",
  },
  {
    title: "Anal ",
    value: "Send me a photo of you having an intense anal doggystyle sex",
    id: 5,
    image: "🍆",
  },
  {
    title: "Blowjob ",
    value: "Send me a selfie how you are doing a blowjob on your knees please",
    id: 6,
    image: "🫦",
  },
  {
    title: "Custom ",
    id: 7,
    image: "✏️",
  },
];

const textPrompt = [
  {
    title: "Send me... ",
    id: 1,
  },
  {
    title: "Show me... ",
    id: 2,
  },
  {
    title: "Send... ",
    id: 3,
  },
  {
    title: "Can i see... ",
    id: 4,
  },
];

interface ComponentProps {
  closeModal: () => void;
  onSelectMessage: (text: string) => void;
}

const ChatsMessageModal: FC<ComponentProps> = ({
  closeModal,
  onSelectMessage,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, closeModal);

  return (
    <div
      ref={modalRef}
      className="chats-suggestion-modal absolute bottom-[calc(100%+10px)] right-[60px] z-[5] w-[187px] animate-fadeIn space-y-[4px]"
    >
      <div className="rounded-b-[4px] rounded-t-[12px] bg-[#21233A] px-[6px] py-[12px]">
        <p className="mb-[10px] text-[14px] font-semibold">Ask a photo with</p>
        <ul className="">
          {photoPrompt.map((item) => {
            const prompt = item.title.includes("Custom")
              ? "Send me "
              : `${item.value}`;
            return (
              <li key={item.id} className="">
                <button
                  onClick={() => onSelectMessage(prompt)}
                  className="group flex w-full items-center gap-[8px] py-[6px] text-left"
                >
                  <span className="text-[14px]">{item.image}</span>
                  <span className="transition-border border-b border-b-transparent text-[12px] font-medium duration-300 group-hover:border-b-white">
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="rounded-b-[12px] rounded-t-[4px] bg-[#21233A] px-[6px] py-[12px]">
        <ul className="mb-[12px]">
          {textPrompt.map((item) => {
            return (
              <li key={item.id} className="group">
                <button
                  onClick={() => onSelectMessage(item.title)}
                  className="block w-full py-[6px] text-left text-[12px] font-medium"
                >
                  <span className="transition-border border-b border-b-transparent duration-300 group-hover:border-b-white">
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="text-[10px] font-medium leading-[1.2em] tracking-[-0.04em] opacity-50">
          You can request any photo by starting the message with these words.
        </p>
      </div>
    </div>
  );
};

export default ChatsMessageModal;
