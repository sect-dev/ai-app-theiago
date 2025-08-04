import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import useOccupationInfo from "../hooks/useOccupationInfo";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import clsx from "clsx";
import NextButtonIcon from "@/../public/images/createpage/next-button-icon.png";
import CheckButton from "./CheckButton";
import BasicInfoComponentSkeleton from "./BasicInfoComponentSkeleton";

const OccupationComponent = () => {
	const { occupation, setOccupation } = useGenerateImageStore();
	const { data, isLoading, error } = useOccupationInfo();

	if (isLoading) {
		return <BasicInfoComponentSkeleton numberOfCategories={1} />;
	}

	console.log(occupation);

	console.log(data);

	// Функция для обработки выбора опции
	const handleOptionSelect = (optionId: string) => {
		setOccupation(optionId);
	};

	return (
		<div className="mb-8">
			<h2 className="mb-[8px] text-[18px] font-bold leading-[130%] tracking-wide">
				Occupation
			</h2>

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
				{data.map((option) => {
					return (
						<SwiperSlide
							key={option.id}
							className="!h-[217px] !w-[180px] transition-all duration-300"
						>
							{({ isActive }) => (
								<BasicInfoCard
									option={option}
									isActive={isActive}
									isSelected={occupation === option.id}
									onSelect={() => handleOptionSelect(option.id)}
								/>
							)}
						</SwiperSlide>
					);
				})}

				<div
					role="button"
					aria-label="Next Slide"
					className="custom-next absolute right-0 top-1/2 z-10 flex h-[42px] w-[42px] -translate-y-1/2 items-center justify-center rounded-full border border-[#FFFFFF42] bg-[#1214235E]"
				>
					<Image
						src={NextButtonIcon.src}
						width={NextButtonIcon.width / 2}
						height={NextButtonIcon.height / 2}
						alt="next image"
					/>
				</div>

				<div
					role="button"
					aria-label="Prev Slide"
					className="custom-prev absolute left-0 top-1/2 z-10 flex h-[42px] w-[42px] -translate-y-1/2 rotate-180 items-center justify-center rounded-full border border-[#FFFFFF42] bg-[#1214235E]"
				>
					<Image
						src={NextButtonIcon.src}
						width={NextButtonIcon.width / 2}
						height={NextButtonIcon.height / 2}
						alt="prev image"
					/>
				</div>
			</Swiper>
		</div>
	);
};

const BasicInfoCard = ({
	option,
	isActive = false,
	isSelected = false,
	onSelect
}: {
	option: {
		id: string;
		title: string;
		image: string;
	};
	isActive?: boolean;
	isSelected?: boolean;
	onSelect: () => void;
}) => {
	return (
		<div
			onClick={onSelect}
			className={clsx(
				"inner-shadow h-full w-full cursor-pointer overflow-hidden rounded-[16px] transition-all duration-300",
				isActive ? "opacity-100" : "opacity-60"
			)}
		>
			<Image
				src={option.image}
				alt={option.title}
				width={180}
				height={217}
				loading="lazy"
				className="relative h-full w-full object-cover"
			/>

			{isSelected && (
				<div className="absolute right-0 top-0 z-[1] p-[12px]">
					<CheckButton />
				</div>
			)}

			<div className="absolute bottom-0 left-0 right-0 z-[1] mb-[12px] text-[18px] font-bold">
				{option.title}
			</div>

			{!isActive && (
				<div className="bg-inactive-card-gradient absolute inset-0 rounded-[16px] transition-all duration-100" />
			)}

			{isSelected && (
				<div className="border-main-gradient choosen-token-shadow-generate absolute inset-0 rounded-[16px] transition-all duration-100" />
			)}
		</div>
	);
};
export default OccupationComponent;
