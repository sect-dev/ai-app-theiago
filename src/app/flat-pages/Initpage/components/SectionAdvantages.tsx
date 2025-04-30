import React from "react";
import IconFire from "@/../public/images/icons/icon-fire.webp";
import IconHearts from "@/../public/images/icons/icon-pink-hearts.webp";
import IconHeart from "@/../public/images/icons/icon-heart.webp";
import IconSurprise from "@/../public/images/icons/icon-surprise.webp";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";

interface advantagesData {
  title: string;
  description: string;
  id: number;
  image: StaticImageData;
  bg: string;
}

const advantagesData: advantagesData[] = [
  {
    title: "Hot item",
    description:
      "Will do everything you ask, will support sexting and send photos",
    id: 1,
    bg: "linear-gradient(180deg, #FFD641 0%, #FE4B1A 65%)",
    image: IconFire,
  },
  {
    title: "Real love",
    description:
      "Complete immersion and the feeling of real romantic relationships",
    id: 2,
    bg: "linear-gradient(180deg, #0898FF 0%, #2108FF 100%)",
    image: IconHearts,
  },
  {
    title: "Online 24/7",
    description: "Will be available and respond to your messages at any time",
    id: 3,
    bg: "linear-gradient(180deg, #FF08E6 0%, #FF087F 100%)",
    image: IconHeart,
  },
  {
    title: "Full safety",
    description: "Guaranteed 30 days money back at any time. Full anonymity.",
    id: 4,
    bg: "linear-gradient(180deg, #4AFF08 0%, #17C600 100%)",
    image: IconSurprise,
  },
];

const SectionAdvantages = () => {
  return (
    <div className="flex gap-[10px] py-[24px] shrink-0 w-full font-bai-jamjuree flex-wrap bg-[#191B2C] rounded-[32px] fm:flex-col fm:pt-0 fm:gap-[2.13vw] fm:bg-transparent fm:rounded-[8.53vw]">
      {advantagesData.map((item) => {
        return (
          <div
            style={{ background: item.bg }}
            key={item.id}
            className={clsx(
              "p-[15px] rounded-[12px] w-[48%] fm:w-full fm:rounded-[8.53vw] fm:p-[4.27vw]",
              {
                "rounded-tl-[32px] fm:rounded-br-[3.20vw]": item.id === 1,
                "rounded-tr-[32px] fm:rounded-bl-[3.20vw]": item.id === 2,
                "rounded-bl-[32px] fm:rounded-br-[3.20vw]": item.id === 3,
                "rounded-br-[32px] fm:rounded-bl-[3.20vw]": item.id === 4,
              },
            )}
          >
            <div className="p-[5px] rounded-[12px] bg-[#121423] size-[44px] flex items-center justify-center mb-[12px] fm:p-[1.33vw] fm:rounded-[3.20vw] fm:size-[11.73vw] fm:mb-[3.20vw]">
              <Image
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt="image"
                className=""
              />
            </div>
            <p className="text-[20px] font-bold mb-[7px] tracking-[-0.04em] fm:mb-[1.87vw] fm:text-[5.33vw]">
              {item.title}
            </p>
            <p className="text-[14px] font-semibold tracking-[-0.04em] leading-[1.2em] fm:text-[3.73vw]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SectionAdvantages;
