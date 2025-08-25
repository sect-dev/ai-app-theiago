"use client";
import React, { FC } from "react";
import Image from "next/image";
import FavoritesGirlsCard from "@/app/widgets/FavoritesGirls/FavoritesGirlsCard";
import { Character } from "@/app/shared/api/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import clsx from "clsx";
import ArrowNav from "@/../public/images/icons/arrow-gradient-blue.svg";
import { useTranslations } from "next-intl";
import CreateCharBanner1 from "@/../public/images/img/create-char-featured-banner1.png"
import CreateCharBanner2 from "@/../public/images/img/create-char-featured-banner2.png"
import CreateCharBanner3 from "@/../public/images/img/create-char-featured-banner3.png"
import { useRouter } from "next/navigation";

interface ComponentProps {
	avatars: Character[] | null;
}

const createCharBanners = [
	{
		src: CreateCharBanner1,
		alt: "Create Char Banner 1"
	},
	
	{
		src: CreateCharBanner2,
		alt: "Create Char Banner 2"
	},
	
	{
		src: CreateCharBanner3,
		alt: "Create Char Banner 3"
	},
]

const FavoritesGirls: FC<ComponentProps> = ({ avatars }) => {
	const t = useTranslations("HomePage");
	const router = useRouter();
	return (
		<div className="rounded-l-[24px] bg-[#121423] p-[24px] md:rounded-none md:p-[16px]">
			<p className="mb-[16px] text-[20px] font-semibold tracking-[0.02vw] sm:hidden">
				{t("card_they_crave")}
			</p>
			<div className="flex">
<div className="w-[300px] h-[330px] mr-[12px] relative card-shadow rounded-[34px] cursor-pointer" onClick={() => router.push("/create")}>
	<Swiper
		modules={[Autoplay, Pagination]}
		spaceBetween={10}
		slidesPerView={1}
		loop={true}
		autoplay={{ delay: 3000, disableOnInteraction: false }}
		pagination={{ clickable: true }}
		className="rounded-2xl shadow-lg"
		>
	{createCharBanners.map((banner, index) => (
	<SwiperSlide key={index}>
		<Image
			src={banner.src}
			alt={banner.alt}
			width={1200}
			height={600}
			className="rounded-2xl object-cover object-top max-w-[300px] max-h-[330px]"
			priority={index === 0}
		/>
		        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18, 20, 35, 0) 37.55%, rgba(18, 20, 35, 0.5) 68.21%, #121423 99.09%)",
          }}
        />
		<div className="absolute z-10 bottom-[85px] left-[170px] w-full -translate-x-1/2 text-white text-[26px] leading-[120%] font-bold">
			Create Your Own <br /> AI Girlfriend
		</div>
			<button className="absolute bottom-[17px] left-1/2 -translate-x-1/2 z-10 bg-[#FFFFFF] w-[268px] h-[52px] rounded-[20px]">
		<span className="font-bold text-[20px] leading-[22px] text-transparent bg-main-gradient bg-clip-text">Try For Free</span>
	</button>
	</SwiperSlide>
	))}
	</Swiper>

</div>
							<Swiper
				slidesPerView={"auto"}
				// freeMode={true}
				// autoplay={{
				// 	delay: 5500,
				// 	disableOnInteraction: true
				// }}
				modules={[Autoplay, FreeMode, Navigation]}
				navigation={{
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}}
			>
				{avatars?.map((avatar, index) => {
					return (
						<SwiperSlide
							key={avatar.id}
							className="mr-[12px] !h-[330px] !w-[300px]"
						>
							<FavoritesGirlsCard avatar={avatar} />
						</SwiperSlide>
					);
				})}

				<div
					role="button"
					aria-label="Next Slide"
					className={clsx(
						"swiper-button-next gradient-border shadow-custom-purple !absolute !right-[20px] top-1/2 z-10 flex !h-[40px] !w-[40px] -translate-y-1/2 items-center justify-center rounded-[50%] !bg-[#121423] before:rounded-full after:hidden lg:!right-[30vw] lg:!h-[4.796vw] lg:!w-[4.796vw] sm:!right-[2vw] sm:!h-[11.111vw] sm:!w-[11.111vw]",
						{}
					)}
				>
					<Image
						src={ArrowNav.src}
						width={ArrowNav.width}
						height={ArrowNav.height}
						alt="next image"
					/>
				</div>
			</Swiper>
			</div>
		</div>
	);
};

export default FavoritesGirls;
