import { useBasicInfo } from "../hooks/useBasicInfo";
import { Virtuoso } from "react-virtuoso";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Virtual } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import FavoritesGirlsCard from "@/app/widgets/FavoritesGirls/FavoritesGirlsCard";
import { captureConsoleIntegration } from "@sentry/nextjs";
import "swiper/css";
import "swiper/css/navigation";
import NextButtonIcon from "@/../public/images/createpage/next-button-icon.png";
import PrevButtonIcon from "@/../public/images/createpage/prev-button-icon.png";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";

const mockData = [
	{
		category: "ethnicity",
		title: "Ethnicity",
		options: [
			{
				id: "black",
				label: "Black",
				image:
					"https://cdn.aigo.sect.dev/constructor_assets/basic/ethnicity/black.png"
			},
			{
				id: "latina",
				label: "Latina",
				image:
					"https://cdn.aigo.sect.dev/constructor_assets/basic/ethnicity/latina.png"
			},
			{
				id: "european",
				label: "European",
				image:
					"https://cdn.aigo.sect.dev/constructor_assets/basic/ethnicity/european.png"
			},
			{
				id: "asian",
				label: "Asian",
				image:
					"https://cdn.aigo.sect.dev/constructor_assets/basic/ethnicity/asian.png"
			}
		]
	},
	{
		category: "body_type",
		title: "Body Type",
		options: [
			{
				id: "slim",
				label: "Slim",
				image:
					"https://cdn.aigo.sect.dev/constructor_assets/basic/body_type/slim.png"
			},
			{
				id: "curvy",
				label: "Curvy",
				image:
					"https://cdn.aigo.sect.dev/constructor_assets/basic/body_type/curvy.png"
			},
			{
				id: "athletic",
				label: "Athletic",
				image:
					"https://cdn.aigo.sect.dev/constructor_assets/basic/body_type/athletic.png"
			}
		]
	}
];

const BasicInfoComponent = () => {
	const {
		ethnicity,
		bodyType,
		breastType,
		buttType,
		setEthnicity,
		setBodyType,
		setBreastType,
		setButtType
	} = useGenerateImageStore();
	const { data, isLoading, error } = useBasicInfo();

	console.log(data);

	console.log(ethnicity, bodyType);

	// Функция для обработки выбора опции
	const handleOptionSelect = (category: string, optionId: string) => {
		switch (category) {
			case "ethnicity":
				setEthnicity(optionId);
				break;
			case "body_type":
				setBodyType(optionId);
				break;
			case "breast_type":
				setBreastType(optionId);
				break;
			case "butt_type":
				setButtType(optionId);
				break;
			default:
				break;
		}
	};

	// Функция для получения выбранного значения по категории
	const getSelectedValue = (category: string) => {
		switch (category) {
			case "ethnicity":
				return ethnicity;
			case "body_type":
				return bodyType;
			case "breast_type":
				return breastType;
			case "butt_type":
				return buttType;
			default:
				return "";
		}
	};

	return (
		<div>
			{data.map((category) => {
				const selectedValue = getSelectedValue(category.category);
				return (
					<div key={category.category} className="mb-8">
						<h2 className="mb-[8px] text-[18px] font-bold leading-[130%] tracking-wide">
							{category.title}
						</h2>

						<Swiper
							centeredSlides={true}
							slidesPerView={2.5} // Показывает центральный + части боковых
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
							{category.options.map((option, index) => {
								return (
									<SwiperSlide
										key={option.id}
										className="!h-[217px] !w-[180px] transition-all duration-300"
									>
										{({ isActive }) => (
											<BasicInfoCard
												option={option}
												isActive={isActive}
												isSelected={selectedValue === option.id}
												onSelect={() =>
													handleOptionSelect(category.category, option.id)
												}
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
			})}
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
		label: string;
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
				"h-full w-full cursor-pointer overflow-hidden rounded-[16px] transition-all duration-300",
				isActive ? "opacity-100" : "opacity-60"
			)}
		>
			<Image
				src={option.image}
				alt={option.label}
				width={180}
				height={217}
				loading="lazy"
				className="h-full w-full object-cover"
			/>

			{!isActive && (
				<div className="bg-inactive-card-gradient absolute inset-0 rounded-[16px] transition-all duration-300" />
			)}

			{isSelected && (
				<div className="border-blue-500 bg-blue-500/20 absolute inset-0 rounded-[16px] border-2 transition-all duration-300" />
			)}
		</div>
	);
};

export default BasicInfoComponent;
