import React, { FC } from "react";
import Image from "next/image";
import { CharacterByConstructor } from "@/app/shared/api/types";

interface ComponentProps {
  character: CharacterByConstructor;
}

const SectionSelect: FC<ComponentProps> = ({ character }) => {
  const baseUrl = "https://aigo.b-cdn.net/web/paywall_precreated_types";
  const data = [
    {
      title: "Body",
      value: character.body_type,
      image: `${baseUrl}/${character.style}/body/${character.body_type}.png`,
    },
    {
      title: "Breasts",
      value: character.breast_type,
      image: `${baseUrl}/${character.style}/breasts/${character.breast_type}.png`,
    },
    {
      title: "Butt",
      value: character.butt_type,
      image: `${baseUrl}/${character.style}/butt/${character.butt_type}.png`,
    },
    {
      title: "Ethnicity",
      value: character.ethnicity,
      image: `${baseUrl}/${character.style}/race/${character.ethnicity}.png`,
    },
  ];

  return (
    <div className="mb-[17px] pt-[20px] fm:mb-[4.36vw] fm:pt-[4.36vw]">
      <h2 className="text-[28px] font-bold leading-[1.2em] fm:mx-auto fm:max-w-full fm:text-center fm:text-[8.72vw] fm:uppercase sm:text-[9.07vw]">
        Get your girlfriend
      </h2>
      <div className="grid grid-cols-[repeat(2,minmax(160px,1fr))] gap-[12px] pt-[25px] fm:gap-[5.13vw] fm:pt-[6.41vw]">
        {data.map((item) => {
          return (
            <div
              key={item.title}
              className="init-page-select-card relative flex items-center gap-[10px] overflow-hidden rounded-[16px] bg-[#2B2D44] p-[4px] fm:h-[51.28vw] fm:w-full fm:flex-col fm:bg-transparent fm:p-[2.56vw] fm:before:!opacity-100"
            >
              <div className="relative size-[84px] overflow-hidden rounded-[16px] fm:size-full">
                <Image
                  src={item.image}
                  fill
                  alt="image"
                  className="rounded-[16px] object-cover fm:absolute fm:left-0 fm:top-0"
                />
              </div>
              <div className="flex flex-col fm:absolute fm:bottom-[10px] fm:left-1/2 fm:z-[12] fm:-translate-x-1/2 fm:flex-row fm:gap-[3px]">
                <p className="mb-[4px] text-[14px] font-semibold fm:text-[3.59vw]">
                  {item.title}
                </p>
                <p className="text-[14px] font-bold fm:text-[3.59vw]">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionSelect;
