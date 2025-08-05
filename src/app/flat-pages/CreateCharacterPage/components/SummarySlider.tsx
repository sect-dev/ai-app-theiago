import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import clsx from "clsx";

interface Props {
	params: {
		id: string;
		title: string;
		url: string;
	}[];
}

const SummarySlider = (props: Props) => {
	const { params } = props;

	return (
		<div className="mb-8">
			<Swiper
				centeredSlides={true}
				slidesPerView={2.2} // Показывает центральный + части боковых
				spaceBetween={20}
				loop={true}
				autoplay={{
					delay: 5500,
					disableOnInteraction: true
				}}
				modules={[Autoplay, Navigation]}
				navigation={{
					nextEl: ".custom-next",
					prevEl: ".custom-prev"
				}}
				className="!overflow-visible"
			>
				{params.map((option) => {
					return (
						<SwiperSlide
							key={option.id}
							className="!h-[217px] !w-[180px] transition-all duration-300"
						>
							<BasicInfoCard option={{ ...option, image: option.url }} />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

const BasicInfoCard = ({
	option
}: {
	option: {
		id: string;
		title: string;
		image: string;
	};
}) => {
	return (
		<div className="inner-shadow h-full w-full cursor-pointer overflow-hidden rounded-[16px] transition-all duration-300">
			<Image
				src={option.image}
				alt={option.title}
				width={180}
				height={217}
				loading="lazy"
				className="relative h-full w-full object-cover"
			/>

			<div className="absolute bottom-0 left-0 right-0 z-[1] mb-[12px] text-[18px] font-bold">
				{option.title}
			</div>

			<div className="bg-inactive-card-gradient absolute inset-0 rounded-[16px] transition-all duration-100" />
		</div>
	);
};
export default SummarySlider;
