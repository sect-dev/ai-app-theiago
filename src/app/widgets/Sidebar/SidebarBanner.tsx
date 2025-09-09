import React from "react";
import Image from "next/image";
import ImageBg from "@/../public/images/img/connection.png";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/app/shared/store/authStore";

const SidebarBanner = () => {
  const { setPaywallModal } = useAuthStore();

	const t = useTranslations("HomePage");

  const onclick = () => {
    setPaywallModal(true);
  }

	return (
		<div className="relative animate-fadeIn overflow-hidden rounded-[16px] bg-main-gradient p-[12px]">
			<Image
				src={ImageBg.src}
				width={ImageBg.width}
				height={ImageBg.height}
				alt="background image"
				sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 15.23vw"
				className="absolute right-[-1vw] top-[-1vw] z-[1] size-[10.23vw]"
			/>
			<div className="relative z-[2]">
				<div className="mb-[10px]">
					<span className="text-[14px] font-medium opacity-[60%]">
						{t("sidebar_sub_banner_try_now")}
					</span>
					<p className="text-[20px] font-semibold tracking-[-0.005vw]">
						{t("sidebar_sub_banner_with_no_limits")}
					</p>
				</div>
				<ul className="mb-[1.25vw] text-[14px]">
					<li className="flex gap-[6px] font-semibold">
						<span className="text-[14px]">🔥</span>{" "}
						{t("sidebar_sub_banner_unlimited_photos")}
					</li>
					<li className="flex gap-[6px] font-semibold">
						<span className="text-[14px]">💕</span>{" "}
						{t("sidebar_sub_banner_creating_bots")}
					</li>
					<li className="flex gap-[6px] font-semibold">
						<span className="text-[14px]">⭐</span>{" "}
						{t("sidebar_sub_banner_no_ads")}
					</li>
				</ul>
				<button
          type={"button"}
          onClick={onclick}
					className="block flex h-[28px] w-full items-center justify-center rounded-[16px] bg-white text-[14px] font-semibold text-blue"
				>
					{t("sidebar_sub_banner_see_more")}
				</button>
			</div>
		</div>
	);
};

export default SidebarBanner;
