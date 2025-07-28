import { Swiper, SwiperSlide } from "swiper/react";
import CreateImageBanner from "../CreateImageBanner";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import GenerateCharacterBanner from "../GenerateCharacterBanner";

const Banner = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const components = [<CreateImageBanner />, <GenerateCharacterBanner />];

	return (
		<div className="relative mx-auto w-full">
			<Swiper
				modules={[Autoplay]}
				autoplay={{ delay: 111115000, disableOnInteraction: false }}
				loop={true}
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
				className="overflow-hidden rounded-xl"
			>
				{components.map((Component, index) => (
					<SwiperSlide key={index}>{Component}</SwiperSlide>
				))}
			</Swiper>
			{/* Индикатор */}
			<div className="absolute bottom-0 right-[20px] z-[2] flex justify-center gap-2">
				{components.map((_, index) => (
					<span
						key={index}
						className={`text-lg font-bold ${
							index === activeIndex ? "text-[#BD006B]" : "text-gray-400"
						}`}
					>
						{index + 1}
					</span>
				))}
			</div>
		</div>
	);
};

export default Banner;
