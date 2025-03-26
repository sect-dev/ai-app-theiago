import React, {FC} from 'react';
import SidebarMenu from "@/app/widgets/Sidebar/SidebarMenu";
import SidebarBanner from "@/app/widgets/Sidebar/SidebarBanner";
import Image from "next/image";
import Link from "next/link";
import IconDownload from '@/../public/images/icons/icon-download.svg';
import {useSelectedCardStore} from "@/app/shared/store/publicStore";

interface ComponentProps {
  isChatPage: boolean
  pathname: string
}

const Sidebar:FC<ComponentProps> = ({isChatPage,pathname}) => {
  const {setQrModal} = useSelectedCardStore()
  return (
    <div className="w-full h-[calc(100vh-46px)] pt-[15px] pb-[24px]">
      <div className="container h-full">
        <div className="flex flex-col justify-between gap-[0.5vw] h-full">
          <SidebarMenu pathname={pathname} />
          <div className="space-y-[12px]">
            {!isChatPage && <SidebarBanner/>}
            <button
              onClick={() => setQrModal(true)}
              className="flex items-center rounded-[12px] gap-[8px] py-[12px] px-[16px] bg-[#121423] font-semibold text-[14px] tracking-[-0.01vw] transition-bg duration-300 hover:bg-[#2E335B]">
              <Image
                src={IconDownload.src}
                width={IconDownload.width}
                height={IconDownload.height}
                alt="download app"
              />
              {!isChatPage && <span className="animate-fadeIn">Download App</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;