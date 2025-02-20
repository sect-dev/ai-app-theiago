import React, {FC, useRef} from 'react';
import {useClickOutside} from "@/app/shared/hooks/useClickOutside";

const photoPrompt = [
  {
    title: 'Breasts',
    id: 1,
    image: '🍒'
  },
  {
    title: 'Butt',
    id: 2,
    image: '🌰'
  },
  {
    title: 'Pussy',
    id: 3,
    image: '🐱'
  },
  {
    title: 'Custom',
    id: 4,
    image: '✏️'
  },
]

const textPrompt = [
  {
    title: 'Send me...',
    id: 1
  },
  {
    title: 'Show me...',
    id: 2
  },
  {
    title: 'Send...',
    id: 3
  },
  {
    title: 'Can i see...',
    id: 4
  },
]

interface ComponentProps {
  closeModal: () => void
}

const ChatsMessageModal:FC<ComponentProps> = ({closeModal}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, closeModal);

  return (
    <div ref={modalRef} className="animate-fadeIn w-[187px] absolute right-[60px] bottom-[calc(100%+10px)] space-y-[4px]">
      <div className="py-[12px] px-[6px] bg-[#21233A] rounded-t-[12px] rounded-b-[4px]">
        <p className="text-[14px] font-semibold mb-[10px]">Ask a photo with</p>
        <ul className="space-y-[12px]">
          {photoPrompt.map(item => {
            return (
              <li key={item.id} className="flex items-center gap-[8px]">
                <span className="text-[14px]">{item.image}</span>
                <span className="text-[12px] font-medium">{item.title}</span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="py-[12px] px-[6px] bg-[#21233A] rounded-b-[12px] rounded-t-[4px]">
        <ul className="space-y-[12px] mb-[12px]">
          {textPrompt.map(item => {
            return (
              <li key={item.id} className="text-[12px] font-medium">
                {item.title}
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