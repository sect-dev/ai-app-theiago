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
	setIsMenuOpen
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
					<div className="space-y-[4px]">
						{!isChatPage && !isHidden && <SidebarBanner />}
						{!isChatPage && !isHidden && (
							<Link
								href="/affiliate"
								className="transition-bg flex h-[40px] cursor-pointer items-center justify-center rounded-[4px] bg-[#121423] px-[16px] py-[10px] duration-300 hover:bg-[#2E335B]"
							>
								<span
									className={clsx(
										"text-[14px] font-semibold leading-[16px]",
										pathname === "/affiliate" &&
											"logo-gradient transition-all duration-300"
									)}
								>
									Affiliate Program
								</span>
							</Link>
						)}
						{!isChatPage && !isHidden && (
							<Link
								href="mailto:support@theaigo.com"
								className={clsx(
									"transition-bg flex h-[40px] cursor-pointer flex-col justify-center gap-[2px] rounded-b-[16px] rounded-t-[4px] bg-[#121423] px-[16px] py-[32px] text-left text-[14px] font-semibold duration-300 hover:bg-[#2E335B]"
								)}
							>
								<span
									className={clsx(
										"group-hover:bg-linear-[linear-gradient(180deg, #049AEF 0%, #0862DC 100%)] animate-fadeIn gap-1 text-[#9DB2CE]"
									)}
								>
									Contact Us
								</span>
								<span className={clsx("text-white")}>support@theaigo.com</span>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
