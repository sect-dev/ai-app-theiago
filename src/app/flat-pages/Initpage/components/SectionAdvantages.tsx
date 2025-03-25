import React from 'react';
import IconFire from '@/../public/images/icons/icon-fire.webp';
import IconHearts from '@/../public/images/icons/icon-pink-hearts.webp';
import IconHeart from '@/../public/images/icons/icon-heart.webp';
import IconSurprise from '@/../public/images/icons/icon-surprise.webp';
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

interface advantagesData {
  title: string
  description: string
  id: number
  image: StaticImageData
  bg: string
}

const advantagesData: advantagesData[] = [
  {
    title: "Hot item",
    description: "Will do everything you ask, will support sexting and send photos",
    id: 1,
    bg: "linear-gradient(180deg, #FFD641 0%, #FE4B1A 65%)",
    image: IconFire
  },
  {
    title: "Real love",
    description: "Complete immersion and the feeling of real romantic relationships",
    id: 2,
    bg: "linear-gradient(180deg, #0898FF 0%, #2108FF 100%)",
    image: IconHearts
  },
  {
    title: "Online 24/7",
    description: "Will be available and respond to your messages at any time",
    id: 3,
    bg: "linear-gradient(180deg, #FF08E6 0%, #FF087F 100%)",
    image: IconHeart
  },
  {
    title: "Full safety",
    description: "Guaranteed 30 days money back at any time. Full anonymity.",
    id: 4,
    bg: "linear-gradient(180deg, #4AFF08 0%, #17C600 100%)",
    image: IconSurprise
  },
]

const SectionAdvantages = () => {
  return (
    <div className="flex gap-[10px] py-[24px] shrink-0 w-full font-bai-jamjuree flex-wrap bg-[#191B2C] rounded-[32px]">
      {advantagesData.map(item => {
        return(
          <div
            style={{ background: item.bg }}
            key={item.id}
            className={clsx("p-[15px] rounded-[12px] w-[48%] sm:w-full sm:rounded-[32px]", {
              "rounded-tl-[32px] sm:rounded-br-[12px]": item.id === 1,
              "rounded-tr-[32px] sm:rounded-bl-[12px]": item.id === 2,
              "rounded-bl-[32px] sm:rounded-br-[12px]": item.id === 3,
              "rounded-br-[32px] sm:rounded-bl-[12px]": item.id === 4,
            })}
          >
            <div className="p-[5px] rounded-[12px] bg-[#121423] size-[44px] flex items-center justify-center mb-[12px]">
              <Image
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt="image"
                className=""
              />
            </div>
            <p className="text-[20px] font-bold mb-[7px] tracking-[-0.04em]">{item.title}</p>
            <p className="text-[14px] font-semibold tracking-[-0.04em] leading-[1.2em]">{item.description}</p>
          </div>
        )
      })}
    </div>
  );
};

export default SectionAdvantages;