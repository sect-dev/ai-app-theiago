"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import VideoPlayer from "@/app/widgets/VideoPlayer";
import AudioPlayer from "@/app/widgets/AudioPlayer";
import clsx from "clsx";
import MessageLoading from "@/app/widgets/MessageLoading";
import { Character, Message } from "@/app/shared/api/types";
import { marked } from "marked";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import IconThumbUp from "@/../public/images/icons/icon-thumb-up-like.svg";
import IconThumbDown from "@/../public/images/icons/icon-thumb-down-dislike.svg";
import { useReportStore } from "@/app/shared/store/reportStore";
interface ComponentProps {
	messages: Message[] | null;
	loading: boolean;
	characterInfo: Character | null;
	onDeleteMessage?: (messageIndex: number) => void;
}

const ChatsMessageText: FC<ComponentProps> = ({
	messages,
	loading,
	characterInfo,
	onDeleteMessage
}) => {
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [slides, setSlides] = useState<{ src: string }[]>([]);
	const { setReportModalActive, isReportSubmitted, resetReportSubmitted } =
		useReportStore();

	const handleDislikeClick = () => {
		setReportModalActive(true);
	};

	// Находим индекс последнего сообщения бота
	const lastBotMessageIndex = messages
		? messages
				.map((msg, idx) => ({ msg, idx }))
				.filter((item) => item.msg.sender === "bot")
				.pop()?.idx
		: -1;

	// Обработчик для удаления сообщения после отправки репорта
	useEffect(() => {
		if (
			isReportSubmitted &&
			lastBotMessageIndex !== undefined &&
			lastBotMessageIndex >= 0
		) {
			// Удаляем последнее сообщение бота
			if (onDeleteMessage) {
				onDeleteMessage(lastBotMessageIndex);
			}
			// Сбрасываем состояние отправки репорта
			resetReportSubmitted();
		}
	}, [
		isReportSubmitted,
		lastBotMessageIndex,
		onDeleteMessage,
		resetReportSubmitted
	]);

	useEffect(() => {
		if (messages) {
			const allImages = messages
				.filter((msg) => msg.type.includes("image"))
				.map((msg) => ({
					src: typeof msg.url === "string" ? msg.url : (msg.url?.en ?? "")
				}))
				.filter(Boolean) as { src: string }[];

			setSlides(allImages);
		}
	}, [messages]);

	// Функция открытия Lightbox с конкретным изображением
	const openLightbox = (index: number) => {
		setCurrentSlideIndex(index);
		setLightboxOpen(true);
	};

	useEffect(() => {
		if (messages && messages?.length > 2) {
			setTimeout(() => {
				messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
			}, 350);
		}
	}, [messages, loading]);

	return (
		<>
			{messages?.map((msg, index) => {
				// Проверяем, является ли это сообщение последним от бота
				const isLastBotMessage = index === lastBotMessageIndex;

				// Подготовка URL для медиа-контента
				const mediaUrl =
					typeof msg.url === "string" ? msg.url : (msg.url?.en ?? "");

				// Для изображений - найти индекс в слайдах
				let imageIndex = -1;
				if (msg.type === "image" || msg.type === "image_paywall") {
					imageIndex = slides.findIndex((slide) => slide.src === mediaUrl);
				}

				return (
					<React.Fragment key={index}>
						{/* Video-message */}
						{(msg.type === "video" || msg.type === "video_paywall") && (
							<VideoPlayer url={mediaUrl} text={msg.text ?? ""} />
						)}

						{/* Audio-message */}
						{(msg.type === "audio" || msg.type === "audio_paywall") && (
							<AudioPlayer audioUrl={mediaUrl} text={msg.text} />
						)}

						{/* Image-message */}
						{(msg.type === "image" || msg.type === "image_paywall") &&
							mediaUrl && (
								<div
									onClick={() => openLightbox(imageIndex)}
									className="relative h-[350px] w-[240px] overflow-hidden rounded-[20px] rounded-bl-none"
								>
									<Image
										sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 240px"
										fill
										src={mediaUrl}
										alt="image"
										className="object-cover object-top"
									/>
								</div>
							)}

						{/* Text-message */}
						{(msg.type === "text" || msg.type === "text_paywall") && (
							<div
								className={clsx(
									"w-fit max-w-[80%] animate-fadeIn rounded-[20px] px-[20px] py-[10px] text-[14px] font-medium",
									{
										"ml-auto rounded-br-none bg-main-gradient text-white":
											msg.sender === "user",
										"rounded-bl-none bg-[#21233A]": msg.sender === "bot"
									}
								)}
							>
								<div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
							</div>
						)}

						{/* Добавляем кнопки лайка/дизлайка после последнего сообщения бота */}
						{isLastBotMessage && msg.sender === "bot" && (
							<div className="mt-2 flex gap-[8px]">
								<Image
									className="cursor-pointer transition-all duration-300 hover:opacity-80"
									src={IconThumbUp.src}
									alt="thumb up"
									width={IconThumbUp.width}
									height={IconThumbUp.height}
								/>
								<Image
									onClick={handleDislikeClick}
									className="cursor-pointer transition-all duration-300 hover:opacity-80"
									src={IconThumbDown.src}
									alt="thumb down"
									width={IconThumbDown.width}
									height={IconThumbDown.height}
								/>
							</div>
						)}
					</React.Fragment>
				);
			})}

			{/* Спиннер загрузки */}
			{loading && (
				<div className="animate-fadeIn space-y-[6px] pt-[32px]">
					<div className="flex h-[28px] w-[80px] animate-fadeIn items-center justify-center rounded-[20px] rounded-bl-none bg-[#21233A] text-[14px] font-medium">
						<MessageLoading />
					</div>
					<p className="text-[12px] font-medium tracking-[-0.04em] opacity-50">
						Typing message
					</p>
				</div>
			)}
			<Lightbox
				open={lightboxOpen}
				close={() => setLightboxOpen(false)}
				slides={slides}
				index={currentSlideIndex}
			/>
			<div ref={messagesEndRef} />
		</>
	);
};

export default ChatsMessageText;
