"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageIconOrange from "@/../public/images/img/image-sparkling-orange.png";
import Spinner from "../Spinner";
import ImageCreateBannerRight from "@/../public/images/img/image-create-banner-right.png";
import ImageCreateBannerLeft from "@/../public/images/img/image-generator-banner-left.png";
import ImageGeneratorBannerBlue from "@/../public/images/img/image-generator-banner-blue.png";
import ImageGeneratorBannerGirls from "@/../public/images/img/image-generator-banner-girls.png";
import { useTranslations } from "next-intl";

const CreateImageBanner = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const t = useTranslations("HomePage");

	const handleClick = () => {
		setIsLoading(true);
		router.push("/generate");
	};

	return (
		<div
			onClick={handleClick}
			className="choosen-token-shadow-generate mx-[16px] mb-[18px] mt-[9px] cursor-pointer rounded-[32px]"
		>
			<div className="main-gradient flex h-[225px] w-full justify-between rounded-[32px] sm:h-[175px]">
				<div className="relative py-[35px] pl-[64px] sm:p-[16px]">
					<div className="relative z-[1] mb-[24px] flex flex-col gap-[8px]">
						<span className="text-[38px] font-bold leading-[1.2] lgm:text-[24px]">
							{t("generator_banner_image_generator")}
						</span>
						<span className="block text-[20px] font-semibold leading-[1.3] lgm:text-[14px] sm:hidden">
							{t("generator_banner_get_your_perfect")}
						</span>
						<span className="hidden text-[20px] font-semibold leading-[1.3] lgm:text-[14px] sm:block">
							{t("generator_banner_mobile_get_your")} <br />{" "}
							{t("generator_banner_mobile_ai_generated")}
						</span>
					</div>
					<div className="relative z-[1] flex h-[46px] w-[131px] items-center justify-center gap-[8px] rounded-[20px] bg-[#FFFFFF] px-[16px] py-[12px] shadow-white-shadow">
						{isLoading ? (
							<Spinner className="mx-auto h-[22px] w-[22px] rounded-[12px] border-[2px] border-[#007AFF] border-t-transparent" />
						) : (
							<>
								<Image
									src={ImageIconOrange.src}
									alt="image icon"
									width={22}
									height={22}
									className="size-[22px]"
								/>
								<span className="bg-main-gradient bg-clip-text text-[18px] font-bold text-transparent">
									{t("generator_banner_try")}
								</span>
							</>
						)}
					</div>
				</div>

				{/* TODO: add image */}
				<Image
					src={ImageCreateBannerRight.src}
					alt="create image banner"
					width={ImageCreateBannerRight.width}
					height={ImageCreateBannerRight.height}
					className="z-[5] block sm:hidden"
				/>
				<Image
					src={ImageGeneratorBannerBlue.src}
					alt="create image banner"
					width={ImageGeneratorBannerBlue.width}
					height={ImageGeneratorBannerBlue.height}
					className="absolute right-0 hidden h-full w-full sm:block"
				/>
				<Image
					src={ImageGeneratorBannerGirls.src}
					alt="girls"
					width={ImageGeneratorBannerGirls.width}
					height={ImageGeneratorBannerGirls.height}
					className="absolute right-0 z-[1] hidden h-full sm:block"
				/>

				<Image
					src={ImageCreateBannerLeft.src}
					alt="create image banner"
					width={ImageCreateBannerLeft.width}
					height={ImageCreateBannerLeft.height}
					className="absolute left-0 top-0 hidden lg:block fm:hidden"
				/>
			</div>
		</div>
	);
};

export default CreateImageBanner;
