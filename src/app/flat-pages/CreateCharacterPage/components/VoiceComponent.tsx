import useVoicesInfo from "../hooks/useVoicesInfo";
import PlayButton from "@/../public/images/createpage/icon-play.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import NextButtonIcon from "@/../public/images/createpage/next-button-icon.png";
import clsx from "clsx";
import { useGenerateImageStore } from "@/app/shared/store/createCharacterStore";
import CheckButton from "./CheckButton";
import VoiceComponentSkeleton from "./VoiceComponentSkeleton";
import IconsPause from "@/../public/images/createpage/icon-pause.png";

interface VoiceCardProps {
	id: string;
	title: string;
	url: string;
	isSelected?: boolean;
	isActive?: boolean;
	onSelect: () => void;
	activePlayingId: string | null;
	setActivePlayingId: (id: string | null) => void;
}

const VoiceComponent = () => {
	const { data, isLoading, error } = useVoicesInfo();
	const { voice, setVoice } = useGenerateImageStore();
	const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

	if (isLoading) return <VoiceComponentSkeleton />;
	if (error) return <div>Error: {error}</div>;

	const isMobile = window.innerWidth <= 570;

	return (
		<div className="mb-[12px]">
			<span className="mb-[8px] block text-[18px] font-bold leading-[130%] tracking-wide">
				Voice
			</span>

			<Swiper
				centeredSlides={true}
				slidesPerView={isMobile ? 2.25 : 2.75}
				spaceBetween={20}
				loop={true}
				modules={[Navigation]}
				navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
				className="!overflow-visible"
			>
				{data?.map((dataVoice) => (
					<SwiperSlide key={dataVoice.id} className="!h-[105px] !w-[142px]">
						{({ isActive }) => (
							<VoiceCard
								id={dataVoice.id}
								title={dataVoice.title}
								url={dataVoice.url}
								isActive={isActive}
								isSelected={voice === dataVoice.title}
								onSelect={() => setVoice(dataVoice.title)}
								activePlayingId={activePlayingId}
								setActivePlayingId={setActivePlayingId}
							/>
						)}
					</SwiperSlide>
				))}

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

export default VoiceComponent;

const VoiceCard = (props: VoiceCardProps) => {
	const {
		id,
		title,
		url,
		isSelected,
		isActive = false,
		onSelect,
		activePlayingId,
		setActivePlayingId
	} = props;
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlayClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // чтобы не срабатывал onClick карточки
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
			setActivePlayingId(null);
		} else {
			audio.play();
			setIsPlaying(true);
			setActivePlayingId(id);
		}
	};

	return (
		<div
			onClick={onSelect}
			className={clsx(
				"flex h-[105px] w-[142px] flex-col items-start rounded-[16px] bg-[#1D1F37] p-[16px] transition-all duration-100",
				isSelected && "border-main-gradient choosen-token-shadow-generate"
			)}
		>
			<div className="mb-[16px]">
				<button
					onClick={handlePlayClick}
					className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-main-gradient"
				>
					{isPlaying ? (
						<Image
							src={IconsPause.src}
							alt="pause"
							width={18}
							height={18}
							className="max-h-[18px] max-w-[18px]"
						/>
					) : (
						<Image
							src={PlayButton.src}
							alt="play"
							width={10}
							height={10}
							className="max-h-[10px] max-w-[10px]"
						/>
					)}
				</button>
			</div>

			{isSelected && (
				<div className="absolute right-0 top-0 z-[1] px-[16px] py-[18px]">
					<CheckButton />
				</div>
			)}

			<div>
				<span className="text-[14px] font-semibold leading-[150%]">
					{title}
				</span>
			</div>

			<audio
				ref={audioRef}
				src={url}
				className="hidden"
				onEnded={() => {
					setIsPlaying(false);
					setActivePlayingId(null);
				}}
			>
				Your browser does not support the audio element.
			</audio>
		</div>
	);
};
