import React from 'react';
import Image from "next/image";
import ImageBg from '@/../public/images/img/connection.png';

const SidebarBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-[1.25vw] p-[0.94vw] bg-main-gradient">
      <Image
        src={ImageBg.src}
        width={ImageBg.width}
        height={ImageBg.height}
        alt="background image"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 15.23vw"
        className="absolute right-[-1vw] top-[-1vw] size-[10.23vw] z-[1]"
      />
      <div className="relative z-[2]">
        <div className="mb-[0.78vw]">
          <span className="text-[1.09vw] font-medium opacity-[60%]">Try now</span>
          <p className="text-[1.56vw] font-semibold tracking-[-0.005vw]">With no limits</p>
        </div>
        <ul className="text-[1.09vw] mb-[1.25vw]">
          <li className="flex gap-[0.47vw]">
            <span>🔥</span> Unlimited photos
          </li>
          <li className="flex gap-[0.47vw]">
            <span>💕</span> Creating bots
          </li>
          <li className="flex gap-[0.47vw]">
            <span>⭐</span> No ads
          </li>
        </ul>
        <button className="text-blue text-[1.09vw] h-[2.19vw] font-semibold bg-white rounded-[1.25vw] w-full ">
          See more
        </button>
      </div>
    </div>
  );
};

export default SidebarBanner;