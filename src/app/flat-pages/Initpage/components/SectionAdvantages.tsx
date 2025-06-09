import React from "react";
import IconFire from "@/../public/images/icons/icon-fire.webp";
import IconHearts from "@/../public/images/icons/icon-pink-hearts.webp";
import IconHeart from "@/../public/images/icons/icon-heart.webp";
import IconSurprise from "@/../public/images/icons/icon-surprise.webp";
import Image, { StaticImageData } from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface advantagesData {
  title: string;
  description: string;
  id: number;
  image: StaticImageData;
  bg: string;
}

const SectionAdvantages = () => {
  const t = useTranslations("Paywall");

  const advantagesData: advantagesData[] = [
    {
      title: t("advantages_hot_item"),
      description: t("advantages_hot_item_description"),
      id: 1,
      bg: "linear-gradient(180deg, #FFD641 0%, #FE4B1A 65%)",
      image: IconFire,
    },
    {
      title: t("advantages_real_love"),
      description: t("advantages_real_love_description"),
      id: 2,
      bg: "linear-gradient(180deg, #0898FF 0%, #2108FF 100%)",
      image: IconHearts,
    },
    {
      title: t("advantages_online_24_7"),
      description: t("advantages_online_24_7_description"),
      id: 3,
      bg: "linear-gradient(180deg, #FF08E6 0%, #FF087F 100%)",
      image: IconHeart,
    },
    {
      title: t("advantages_full_safety"),
      description: t("advantages_full_safety_description"),
      id: 4,
      bg: "linear-gradient(180deg, #4AFF08 0%, #17C600 100%)",
      image: IconSurprise,
    },
  ];

  return (
    <div className="flex w-full shrink-0 flex-wrap gap-[10px] rounded-[32px] bg-[#191B2C] py-[24px] font-bai-jamjuree fm:flex-col fm:gap-[2.13vw] fm:rounded-[8.53vw] fm:bg-transparent fm:pt-0">
      {advantagesData.map((item) => {
        return (
          <div
            style={{ background: item.bg }}
            key={item.id}
            className={clsx(
              "w-[48%] rounded-[12px] p-[15px] fm:w-full fm:rounded-[8.53vw] fm:p-[4.27vw]",
              {
                "rounded-tl-[32px] fm:rounded-br-[3.20vw]": item.id === 1,
                "rounded-tr-[32px] fm:rounded-bl-[3.20vw]": item.id === 2,
                "rounded-bl-[32px] fm:rounded-br-[3.20vw]": item.id === 3,
                "rounded-br-[32px] fm:rounded-bl-[3.20vw]": item.id === 4,
              },
            )}
          >
            <div className="mb-[12px] flex size-[44px] items-center justify-center rounded-[12px] bg-[#121423] p-[5px] fm:mb-[3.20vw] fm:size-[11.73vw] fm:rounded-[3.20vw] fm:p-[1.33vw]">
              <Image
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt="image"
                className=""
              />
            </div>
            <p className="mb-[7px] text-[20px] font-bold tracking-[-0.04em] fm:mb-[1.87vw] fm:text-[5.33vw]">
              {item.title}
            </p>
            <p className="text-[14px] font-semibold leading-[1.2em] tracking-[-0.04em] fm:text-[3.73vw]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SectionAdvantages;
