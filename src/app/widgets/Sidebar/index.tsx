import React from 'react';
import SidebarMenu from "@/app/widgets/Sidebar/SidebarMenu";
import SidebarBanner from "@/app/widgets/Sidebar/SidebarBanner";
import Image from "next/image";
import Link from "next/link";
import IconDownload from '@/../public/images/icons/icon-download.svg';

const Sidebar = () => {
  return (
    <div className="w-full h-[calc(100vh-46px)] pt-[1.17vw] pb-[1.88vw]">
      <div className="container h-full">
        <div className="grid content-between gap-[0.5vw] h-full">
          <SidebarMenu />
          <div className="space-y-[0.94vw]">
            <SidebarBanner />
            <Link
              href="https://google.com"
              className="flex items-center rounded-[0.94vw] gap-[0.63vw] py-[0.78vw] px-[1.25vw] bg-[#121423] font-semibold text-[1.09vw] tracking-[-0.01vw] transition-bg duration-300 hover:bg-[#2E335B]">
              <Image
                src={IconDownload.src}
                width={IconDownload.width}
                height={IconDownload.height}
                alt="download app"
                className="size-[1.56vw]"
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