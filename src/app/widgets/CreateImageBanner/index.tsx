"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageIconOrange from "@/../public/images/img/image-sparkling-orange.png";
import Spinner from "../Spinner";
import ImageCreateBannerLeft1 from "@/../public/images/img/image-create-banner-leftt.png";
import ImageCreateBannerRight from "@/../public/images/img/image-girls-banner-left.png";
import ImageRightBlack from "@/../public/images/img/image-create-banner-right-black.png";
import ImageLeftBlack from "@/../public/images/img/image-create-banner-back-left.png";
import ImageMobileBannerLeft from "@/../public/images/img/image-left-banner-blue.png";
import ImageMobileBannerGirls from "@/../public/images/img/mobile-banner-girls-right.png";
import ImageMobileBannerBlackTop from "@/../public/images/img/mobile-banner-black-top.png";
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
			className="choosen-token-shadow-generate mx-[16px] mb-[18px] mt-[9px] cursor-pointer rounded-[32px] relative"
		>
			<div className="bg-[#0C0D10] flex h-[225px] w-full justify-between rounded-[32px] sm:h-[175px]">
				<div className="relative py-[32px] pl-[43px] sm:p-[16px] z-[2]">
					<div className="relative z-[1] mb-[24px] flex flex-col gap-[8px]">
						<span className="text-[42px] italic font-bold leading-[1.2] lgm:text-[24px]">
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
								<span className="bg-main-gradient bg-clip-text text-[18px] font-bold text-transparent sm:text-[#0D0E11]">
									{t("generator_banner_try")}
								</span>
							</>
						)}
					</div>
				</div>

				<Image 
					src={ImageMobileBannerLeft.src}
					alt="create image banner"
					width={ImageMobileBannerLeft.width}
					height={ImageMobileBannerLeft.height}
					className="absolute left-0 top-0 rounded-l-[32px] z-[1] hidden sm:block"
				/>

				<Image
					src={ImageCreateBannerLeft1.src}
					alt="create image banner"
					width={ImageCreateBannerLeft1.width}
					height={ImageCreateBannerLeft1.height}
					className="absolute left-0 rounded-l-[32px] top-0 z-[1] sm:hidden"
				/>

<div className="absolute bottom-0 right-0 hidden sm:block">
  {/* Базовое изображение */}
  <Image 
    src={ImageMobileBannerGirls.src}
    alt="create image banner"
    width={ImageMobileBannerGirls.width / 4}
    height={ImageMobileBannerGirls.height / 4}
    className="block rounded-br-[32px]"
  />

	  <Image
    src={ImageLeftBlack.src}
    alt="create image banner"
    width={ImageLeftBlack.width}
    height={ImageLeftBlack.height}
    className="absolute bottom-0 max-h-[175px]"
  />

  {/* Второе поверх */}
  <Image 
    src={ImageMobileBannerBlackTop.src}
    alt="create image banner"
    width={ImageMobileBannerBlackTop.width}
    height={ImageMobileBannerBlackTop.height}
    className="absolute left-0 top-[-50px] rounded-r-[32px]"
  />
</div>

<div className="relative inline-block sm:hidden lgm:bottom-0 lgm:absolute lgm:right-0">
  <Image
    src={ImageCreateBannerRight.src}
    alt="create image banner"
    width={ImageCreateBannerRight.width / 4}
    height={ImageCreateBannerRight.height / 4}
    className="block lgm:bottom-0"
  />

  <Image 
    src={ImageRightBlack.src}
    alt="create image banner"
    width={ImageRightBlack.width}
    height={ImageRightBlack.height}
    className="absolute right-0 top-0 rounded-r-[32px]"
  />

  <Image
    src={ImageLeftBlack.src}
    alt="create image banner"
    width={ImageLeftBlack.width}
    height={ImageLeftBlack.height}
    className="absolute left-[60px] top-0"
  />
</div>

			</div>
		</div>
	);
};

export default CreateImageBanner;
