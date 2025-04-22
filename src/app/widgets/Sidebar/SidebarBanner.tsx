import React from "react";
import Image from "next/image";
import ImageBg from "@/../public/images/img/connection.png";
import Link from "next/link";

const SidebarBanner = () => {
  return (
    <div className="relative animate-fadeIn overflow-hidden rounded-[16px] p-[12px] bg-main-gradient">
      <Image
        src={ImageBg.src}
        width={ImageBg.width}
        height={ImageBg.height}
        alt="background image"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 15.23vw"
        className="absolute right-[-1vw] top-[-1vw] size-[10.23vw] z-[1]"
      />
      <div className="relative z-[2]">
        <div className="mb-[10px]">
          <span className="text-[14px] font-medium opacity-[60%]">Try now</span>
          <p className="text-[20px] font-semibold tracking-[-0.005vw]">
            With no limits
          </p>
        </div>
        <ul className="text-[14px] mb-[1.25vw]">
          <li className="flex font-semibold gap-[6px]">
            <span className="text-[14px]">🔥</span> Unlimited photos
          </li>
          <li className="flex font-semibold gap-[6px]">
            <span className="text-[14px]">💕</span> Creating bots
          </li>
          <li className="flex font-semibold gap-[6px]">
            <span className="text-[14px]">⭐</span> No ads
          </li>
        </ul>
        <Link
          href="https://quiz.theaigo.com/aigoweb"
          className="text-blue block flex items-center justify-center text-[14px] h-[28px] font-semibold bg-white rounded-[16px] w-full "
        >
          See more
        </Link>
      </div>
    </div>
  );
};

export default SidebarBanner;
