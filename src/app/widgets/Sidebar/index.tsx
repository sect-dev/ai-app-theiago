import React from 'react';
import SidebarMenu from "@/app/widgets/Sidebar/SidebarMenu";
import SidebarBanner from "@/app/widgets/Sidebar/SidebarBanner";
import Image from "next/image";
import Link from "next/link";
import IconDownload from '@/../public/images/icons/icon-download.svg';

const Sidebar = () => {
  return (
    <div className="w-full h-[calc(100vh-46px)] pt-[15px] pb-[24px]">
      <div className="container h-full">
        <div className="flex flex-col justify-between gap-[0.5vw] h-full">
          <SidebarMenu />
          <div className="space-y-[12px]">
            <SidebarBanner />
            <Link
              href="https://google.com"
              className="flex items-center rounded-[12px] gap-[8px] py-[12px] px-[16px] bg-[#121423] font-semibold text-[14px] tracking-[-0.01vw] transition-bg duration-300 hover:bg-[#2E335B]">
              <Image
                src={IconDownload.src}
                width={IconDownload.width}
                height={IconDownload.height}
                alt="download app"
                className="size-[20px]"
              />
              Download App
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;