import { Swiper, SwiperSlide } from "swiper/react";
import CreateImageBanner from "../CreateImageBanner";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import GenerateCharacterBanner from "../GenerateCharacterBanner";

const components = [CreateImageBanner];
const DELAY = 5000;

const Banner = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="relative mx-auto w-full">
			<Swiper
				modules={[Autoplay]}
				autoplay={{ delay: DELAY, disableOnInteraction: false }}
				loop={true}
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
				className="overflow-hidden rounded-xl"
			>
				{components.map((Component, index) => (
					<SwiperSlide key={index}>
						<Component />
					</SwiperSlide>
				))}
			</Swiper>
			{/* indicator */}
			<div className="absolute bottom-[50px] right-[57px] z-[2] flex justify-center gap-[8px] fm:hidden">
				{activeIndex === 0 && (
					<>
						<div className="h-[8px] w-[8px] rounded-full bg-[#FFFFFF]"></div>
						<div className="h-[8px] w-[30px] rounded-[12px] bg-[#FFFFFF] opacity-50"></div>
						<div className="h-[8px] w-[30px] rounded-[12px] bg-[#FFFFFF] opacity-50"></div>
					</>
				)}
				{activeIndex === 1 && (
					<>
						<div className="h-[8px] w-[30px] rounded-[12px] bg-[#FFFFFF] opacity-50"></div>
						<div className="h-[8px] w-[8px] rounded-full bg-[#FFFFFF]"></div>
						<div className="h-[8px] w-[30px] rounded-[12px] bg-[#FFFFFF] opacity-50"></div>
					</>
				)}
			</div>
		</div>
	);
};

export default Banner;
