import React from "react";
import IconFire from "@/../public/images/icons/icon-fire.webp";
import IconHearts from "@/../public/images/icons/icon-pink-hearts.webp";
import IconHeart from "@/../public/images/icons/icon-heart.webp";
import IconSurprise from "@/../public/images/icons/icon-surprise.webp";
import Image, { StaticImageData } from "next/image";

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
    bg: "linear-gradient(180deg, rgba(255, 214, 65, 0.4) 0%, rgba(254, 75, 26, 0.4) 65%)",
    image: IconFire,
  },
  {
    title: "Online 24/7",
    description: "Will be available and respond to your messages at any time",
    id: 2,
    bg: "linear-gradient(180deg, rgba(255, 8, 230, 0.4) 0%, rgba(255, 8, 127, 0.4) 100%)",
    image: IconHeart,
  },
  {
    title: "Real love",
    description:
      "Complete immersion and the feeling of real romantic relationships",
    id: 3,
    bg: "linear-gradient(180deg, rgba(8, 152, 255, 0.4) 0%, rgba(33, 8, 255, 0.4) 100%)",
    image: IconHearts,
  },
  {
    title: "Full safety",
    description: "Guaranteed 30 days money back at any time. Full anonymity.",
    id: 4,
    bg: "linear-gradient(180deg, rgba(74, 255, 8, 0.4) 0%, rgba(23, 198, 0, 0.4) 100%)",
    image: IconSurprise,
  },
];

const PaymentAdvantages = () => {
  return (
    <div className="flex gap-[10px] h-[523px] shrink-0 w-[365px] font-bai-jamjuree flex-wrap bg-[#191B2C] p-[20px] rounded-[32px]">
      {advantagesData.map((item) => {
        return (
          <div
            style={{ background: item.bg }}
            key={item.id}
            className="p-[15px] rounded-[12px] w-[48%]"
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
            <p className="text-[16px] font-bold mb-[7px] tracking-[-0.04em]">
              {item.title}
            </p>
            <p className="text-[14px] font-semibold tracking-[-0.04em] leading-[1.2em]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentAdvantages;
