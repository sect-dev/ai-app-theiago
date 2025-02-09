'use client'
import React, {FC} from 'react';
import Image from "next/image";
import {IAvatar} from "@/app/shared/api/types";

interface ComponentProps {
  avatar: IAvatar
}

const FavoritesGirlsCard:FC<ComponentProps> = ({avatar}) => {
  return (
    <div className="card-shadow cursor-pointer animate-fadeIn flex items-end relative p-[0.94vw] w-[23.44vw] h-[25.78vw] rounded-[1.56vw] overflow-hidden">
      <Image
        src={avatar.avatar}
        fill
        alt="image"
        className="object-cover"
      />
      <div className="relative z-[2]">
        <div className="flex items-center gap-[0.16vw] text-[1.09vw]  mb-[0.63vw] font-semibold font-semibold">
          {avatar.tags.map(tag => {
            return (
              <div key={tag} className="rounded-[0.63vw] font-semibold h-[1.64vw] text-[1.09vw] px-[0.31vw] backdop-blur-[8px] bg-[#3B3E5E8A]">
                {tag}
              </div>
            )
          })}
        </div>
        <p className="text-[1.25vw] font-semibold">{avatar.name}</p>
        <p className="opacity-[60%] line-clamp-2 text-[1.09vw]">
          {avatar.description.en}
        </p>
      </div>
    </div>
  );
};

export default FavoritesGirlsCard;