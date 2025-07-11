"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ImageIconOrange from "@/../public/images/img/image-sparkling-orange.png";
import Spinner from "../Spinner";
import ImageCreateBannerRight from "@/../public/images/img/image-create-banner-right.png";
import ImageCreateBannerLeft from "@/../public/images/img/image-generator-banner-left.png";
import ImageGeneratorBannerSmall from "@/../public/images/img/image-generator-banner-small.png";
import ImageGeneratorBannerSmallSvg from "@/../public/images/img/image-generate-banner-small.svg";

const CreateImageBanner = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleClick = () => {
		setIsLoading(true);
		router.push("/generate");
	};

	return (
		<div className="choosen-token-shadow-generate mx-[16px] mb-[18px] mt-[9px] rounded-[32px]">
			<div className="main-gradient flex h-[225px] w-full justify-between rounded-[32px] sm:h-[175px]">
				<div className="relative py-[35px] pl-[64px] sm:p-[16px]">
					<div className="relative z-[1] mb-[24px] flex flex-col gap-[8px]">
						<span className="lgm:text-[24px] text-[38px] font-bold leading-[1.2]">
							IMAGE GENERATOR
						</span>
						<span className="lgm:text-[14px] text-[20px] font-semibold leading-[1.3]">
							Get Your Perfect AI-generated Image
						</span>
					</div>
					<button
						onClick={handleClick}
						className="shadow-white-shadow relative z-[1] flex h-[46px] w-[131px] items-center justify-center gap-[8px] rounded-[20px] bg-[#FFFFFF] px-[16px] py-[12px]"
					>
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
									Try
								</span>
							</>
						)}
					</button>
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
					src={ImageGeneratorBannerSmall.src}
					alt="create image banner"
					width={ImageGeneratorBannerSmall.width}
					height={ImageGeneratorBannerSmall.height}
					className="absolute right-0 hidden h-[175px] w-[343px] sm:block"
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
