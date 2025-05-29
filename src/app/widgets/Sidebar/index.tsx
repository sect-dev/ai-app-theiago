import React, { FC, useEffect, useState } from "react";
import SidebarMenu from "@/app/widgets/Sidebar/SidebarMenu";
import SidebarBanner from "@/app/widgets/Sidebar/SidebarBanner";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import clsx from "clsx";
import Link from "next/link";

interface ComponentProps {
  isChatPage: boolean;
  pathname: string;
  setIsMenuOpen: (value: boolean) => void;
}

const Sidebar: FC<ComponentProps> = ({
  isChatPage,
  pathname,
  setIsMenuOpen,
}) => {
  const { isPremium } = useAuthStore();
  const [isHidden, setIsHidden] = useState<boolean | null>(true);

  useEffect(() => {
    setIsHidden(isPremium);
  }, [isPremium]);

  return (
    <div className="h-[calc(100vh-46px)] w-full pb-[24px] pt-[15px]">
      <div className="container h-full">
        <div className="flex h-full flex-col justify-between gap-[0.5vw]">
          <SidebarMenu setIsMenuOpen={setIsMenuOpen} pathname={pathname} />
          <div className="space-y-[12px]">
            {!isChatPage && !isHidden && <SidebarBanner />}
            {!isChatPage && !isHidden && (
              <Link
                href="mailto:support@theaigo.com"
                className={clsx(
                  "transition-bg flex h-[40px] cursor-pointer flex-col justify-center gap-[2px] rounded-b-[4px] rounded-t-[16px] bg-[#121423] px-[16px] py-[32px] text-left text-[14px] font-semibold duration-300 hover:bg-[#2E335B]",
                )}
              >
                <span
                  className={clsx(
                    "group-hover:bg-linear-[linear-gradient(180deg, #049AEF 0%, #0862DC 100%)] animate-fadeIn gap-1 text-[#9DB2CE]",
                  )}
                >
                  Contact Us
                </span>
                <span className={clsx("text-white")}>support@theaigo.com</span>
              </Link>
            )}

            {/*<button*/}
            {/*  onClick={() => setQrModal(true)}*/}
            {/*  className="flex items-center w-full rounded-[12px] gap-[8px] py-[12px] px-[16px] bg-[#121423] font-semibold text-[14px] tracking-[-0.01vw] transition-bg duration-300 hover:bg-[#2E335B]">*/}
            {/*  <Image*/}
            {/*    src={IconDownload.src}*/}
            {/*    width={IconDownload.width}*/}
            {/*    height={IconDownload.height}*/}
            {/*    alt="download app"*/}
            {/*  />*/}
            {/*  {!isChatPage && <span className="animate-fadeIn">Download App</span>}*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
