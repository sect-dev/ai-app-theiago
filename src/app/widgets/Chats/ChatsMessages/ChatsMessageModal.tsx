import React, {FC, useRef} from 'react';
import {useClickOutside} from "@/app/shared/hooks/useClickOutside";

const photoPrompt = [
  {
    title: 'Breasts ',
    id: 1,
    image: '🍒'
  },
  {
    title: 'Butt ',
    id: 2,
    image: '🌰'
  },
  {
    title: 'Pussy ',
    id: 3,
    image: '🐱'
  },
  {
    title: 'Custom ',
    id: 4,
    image: '✏️'
  },
]

const textPrompt = [
  {
    title: 'Send me... ',
    id: 1
  },
  {
    title: 'Show me... ',
    id: 2
  },
  {
    title: 'Send... ',
    id: 3
  },
  {
    title: 'Can i see... ',
    id: 4
  },
]

interface ComponentProps {
  closeModal: () => void;
  onSelectMessage: (text: string) => void;
}

const ChatsMessageModal:FC<ComponentProps> = ({closeModal,onSelectMessage}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, closeModal);

  return (
    <div ref={modalRef} className="animate-fadeIn w-[187px] absolute right-[60px] bottom-[calc(100%+10px)] space-y-[4px] z-[5]">
      <div className="py-[12px] px-[6px] bg-[#21233A] rounded-t-[12px] rounded-b-[4px]">
        <p className="text-[14px] font-semibold mb-[10px]">Ask a photo with</p>
        <ul className="">
          {photoPrompt.map(item => {
            const prompt = item.title.includes('Custom') ? 'Send me ' : `Send me your photo with ${item.title}`
            return (
              <li key={item.id} className="">
                <button
                  onClick={() => onSelectMessage(prompt)}
                  className="flex items-center gap-[8px] text-left w-full py-[6px] group"
                >
                  <span className="text-[14px]">{item.image}</span>
                  <span className="text-[12px] font-medium border-b border-b-transparent transition-border duration-300 group-hover:border-b-white">{item.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="py-[12px] px-[6px] bg-[#21233A] rounded-b-[12px] rounded-t-[4px] ">
        <ul className="mb-[12px]">
          {textPrompt.map(item => {
            return (
              <li key={item.id} className="group">
                <button
                  onClick={() => onSelectMessage(item.title)}
                  className="block text-left w-full py-[6px] text-[12px] font-medium "
                >
                  <span className="border-b border-b-transparent transition-border duration-300 group-hover:border-b-white">{item.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="text-[10px] font-medium opacity-50 leading-[1.2em] tracking-[-0.04em]">
          You can request any photo by starting the message with these words.
        </p>
      </div>
    </div>
  );
};

export default ChatsMessageModal;