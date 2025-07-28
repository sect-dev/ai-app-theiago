import Image from "next/image";
import BannerGirl from "@/../public/images/img/create-char-banner-girl.png";
import BannerGradientLeft from "@/../public/images/img/create-char-banner-grad-left.png";
import BannerGradientRight from "@/../public/images/img/create-char-banner-grad-right.png";
import BannerHearts from "@/../public/images/img/create-char-banner-hears11.png";
import BannerHeartsBottom from "@/../public/images/img/create-char-banner-hearts-bottom.png";
import BannerHeartsLeft from "@/../public/images/img/create-char-banner-hearts-left.png";
import BannerMobile from "@/../public/images/img/create-char-banner-mobile-girl.png";
import BannerHeartsMobileRight from "@/../public/images/img/create-char-banner-hearts-left-mobile.png";
import BannerHeartsMobileBottom from "@/../public/images/img/create-char-banner-hearts-bottom-mobile.png";
import BannerHeartsMobileLeft from "@/../public/images/img/create-char-banner-hearts-left-mobile-1.png";
import BannerMobileGradientLeft from "@/../public/images/img/create-char-banner-grad-left-mobile.png";

const GenerateCharacterBanner = () => {
	return (
		<div className="mx-[16px] mb-[18px] mt-[9px] rounded-[32px]">
			<div className="relative flex h-[225px] w-full justify-between rounded-[32px] bg-[#A1003D] bg-[url('/images/img/create-char-banner.png')] bg-cover p-[40px] fm:hidden sm:h-[175px]">
				<div className="z-[1] flex flex-col">
					<span className="mb-[8px] text-[32px] font-bold leading-[120%]">
						CREATE YOUR OWN AI GIRLFRIEND
					</span>
					<span className="mb-[24px] text-[20px] font-semibold leading-[130%]">
						Make Your Own AI Partner
					</span>

					<div className="flex max-w-[178px] items-center justify-center rounded-[24px] bg-[#FFFFFF] px-[32px] py-[15px]">
						<span className="text-[20px] font-bold text-[#BD006B]">
							Try For Free
						</span>
					</div>
				</div>
				<Image
					src={BannerGirl}
					alt="Create Character Banner"
					className="absolute bottom-0 right-0"
					width={BannerGirl.width}
					height={BannerGirl.height}
				/>
				<Image
					src={BannerGradientLeft}
					alt="Create Character Banner"
					className="absolute right-[355px] top-0"
					width={BannerGradientLeft.width}
					height={BannerGradientLeft.height}
				/>
				<Image
					src={BannerGradientRight}
					alt="Create Character Banner"
					className="absolute right-0 top-0 h-full w-[218px] rounded-r-[30px]"
				/>
				<Image
					src={BannerHearts}
					alt="Create Character Banner"
					className="absolute right-[30px] top-0"
					width={BannerHearts.width / 2}
					height={BannerHearts.height / 2}
				/>
				<Image
					src={BannerHeartsBottom}
					alt="Create Character Banner"
					className="absolute bottom-0 right-[100px]"
					width={BannerHeartsBottom.width / 2}
					height={BannerHeartsBottom.height / 2}
				/>
				<Image
					src={BannerHeartsLeft}
					alt="Create Character Banner"
					className="absolute bottom-0 right-[395px]"
					width={BannerHeartsLeft.width / 2}
					height={BannerHeartsLeft.height / 2}
				/>
			</div>
			<GenerateCharacterBannerMobile />
		</div>
	);
};

const GenerateCharacterBannerMobile = () => {
	return (
		<div className="relative flex hidden h-[175px] w-full justify-between rounded-[32px] bg-[#A1003D] bg-[url('/images/img/create-char-banner.png')] bg-cover p-[16px] fm:block sm:h-[175px]">
			<div className="flex flex-col">
				<span className="z-[1] mb-[8px] text-[24px] font-bold leading-[120%]">
					CREATE YOUR OWN <br /> AI GIRLFRIEND
				</span>
				<span className="z-[1] mb-[13px] text-[14px] font-semibold leading-[130%]">
					Make Your Own AI Partner
				</span>

				<div className="z-[1] flex max-w-[145px] items-center justify-center rounded-[20px] bg-[#FFFFFF] px-[21px] py-[12px]">
					<span className="w-fit text-[18px] font-bold leading-[22px] text-[#BD006B]">
						Try For Free
					</span>
				</div>
			</div>
			<Image
				src={BannerMobile}
				alt="Create Character Banner"
				className="absolute bottom-0 right-0 rounded-r-[20px]"
				width={BannerMobile.width / 2}
				height={BannerMobile.height / 2}
			/>
			<Image
				src={BannerHeartsMobileRight}
				alt="Create Character Banner"
				className="absolute right-0 top-0 rounded-r-[30px]"
				width={BannerHeartsMobileRight.width / 2}
				height={BannerHeartsMobileRight.height / 2}
			/>
			<Image
				src={BannerHeartsMobileBottom}
				alt="Create Character Banner"
				className="absolute bottom-0 right-0 rounded-r-[22px]"
				width={BannerHeartsMobileBottom.width / 2}
				height={BannerHeartsMobileBottom.height / 2}
			/>
			<Image
				src={BannerMobileGradientLeft}
				alt="Create Character Banner"
				className="absolute right-[85px] top-0"
				width={BannerMobileGradientLeft.width / 2}
				height={BannerMobileGradientLeft.height / 2}
			/>
			<Image
				src={BannerHeartsMobileLeft}
				alt="Create Character Banner"
				className="absolute bottom-0 right-[110px]"
				width={BannerHeartsMobileLeft.width / 2}
				height={BannerHeartsMobileLeft.height / 2}
			/>
		</div>
	);
};

export default GenerateCharacterBanner;
