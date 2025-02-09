import React from 'react';
import Image from "next/image";
import AvatarImage from '@/../public/images/img/avatar.webp';

const FavoritesGirlsCard = () => {
  return (
    <div className="card-shadow flex items-end relative p-[0.94vw] w-[23.44vw] h-[25.78vw] rounded-[1.56vw] overflow-hidden">
      <Image
        src={AvatarImage.src}
        fill
        alt="image"
        className="object-cover"
      />
      <div className="relative z-[2]">
        <div className="flex items-center gap-[0.16vw] text-[1.09vw]  mb-[0.63vw] font-semibold font-semibold">
          <div className="rounded-[0.63vw] font-semibold h-[1.64vw] text-[1.09vw] px-[0.31vw] backdop-blur-[8px] bg-[#3B3E5E8A]">
            Hot
          </div>
          <div className="rounded-[0.63vw] font-semibold h-[1.64vw] text-[1.09vw] px-[0.31vw] backdop-blur-[8px] bg-[#3B3E5E8A]">
            Anime
          </div>
        </div>
        <p className="text-[1.25vw] font-semibold">Emily</p>
        <p className="opacity-[60%] text-[1.09vw]">
          Cutie girl, that likes to send you messages and a little strange
        </p>
      </div>
    </div>
  );
};

export default FavoritesGirlsCard;