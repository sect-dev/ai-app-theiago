"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import IconSend from "@/../public/images/icons/icon-send.svg";
import IconUpload from "@/../public/images/icons/icon-upload.svg";
import IconUploadGradient from "@/../public/images/icons/icon-upload-gradient.svg";
import IconClose from "@/../public/images/icons/icon-close.svg";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ChatsMessageModal from "@/app/widgets/Chats/ChatsMessages/ChatsMessageModal";
import { sendMessage } from "@/app/shared/api/mesages";
import { Character, Message, PreparedAvatar } from "@/app/shared/api/types";
import ChatsMessageText from "@/app/widgets/Chats/ChatsMessages/ChatsMessageText";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import SuggestionAnswer from "@/app/widgets/SuggestionAnswer";
import { useAuthStore } from "@/app/shared/store/authStore";
import TextareaAutosize from "react-textarea-autosize";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { paidTypesOfMessages } from "@/app/shared/consts";
import { useRouter } from "next/navigation";
import log from "loglevel";
import { useTranslations } from "next-intl";

interface FormData {
	message: string;
}

interface BotMessage {
	message: string;
	type: "text" | "video" | "audio" | "image";
	url?: string;
}

interface ComponentProps {
	characterInfo: Character | null;
}

const ChatsMessages: FC<ComponentProps> = ({ characterInfo }) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[] | null>([]);
	const [isTextareaFocused, setIsTextareaFocused] = useState(false);
	const router = useRouter();
	const { characters, setCharacters } = useSelectedCardStore();
	const { user, setAuthModal, setPaywallModal } = useAuthStore();
	const { setTokens } = usePaymentStore();
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const t = useTranslations("ChatsPage");
	const {isPremium} = useAuthStore();

	log.debug("user_id", user?.uid);

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		setFocus,
		watch,
		resetField
	} = useForm<FormData>();

	useEffect(() => {
		if (characters) {
			const character = characters.find(
				(char: PreparedAvatar) => char.id === characterInfo?.id
			);
			if (character) {
				setMessages(character.listMsgs || []);
			}
		}
	}, [characterInfo]);

	const saveMessagesToLocalStorage = (
		newMessages: Message[],
		tokens?: number
	) => {
		if (!characterInfo) return;
		const storedData = localStorage.getItem("chatStartedCharacters");
		const characters = storedData ? JSON.parse(storedData) : [];

		const characterIndex = characters.findIndex(
			(char: Character) => char.id === characterInfo.id
		);
		const currentTime = new Date();

		if (characterIndex !== -1) {
			const character = characters[characterIndex];
			character.listMsgs = newMessages;
			character.lastMessageTime = currentTime;
			newMessages.forEach((message) => {
				if (
					message.sender === "bot" &&
					(message.type === "image" || message.type === "image_paywall") &&
					message.url
				) {
					const url =
						typeof message.url === "string"
							? message.url
							: (message.url?.en ?? "");
					character.photos = character.photos || [];
					if (!character.photos.includes(url)) {
						character.photos.unshift(url);
					}
				}
				if (
					message.sender === "bot" &&
					(message.type === "video" || message.type === "video_paywall") &&
					message.url
				) {
					character.videos = character.videos || [];
					const url =
						typeof message.url === "string"
							? message.url
							: (message.url?.en ?? "");
					if (!character.videos.includes(url)) {
						character.videos.unshift(url);
					}
				}
			});
		}

		localStorage.setItem("chatStartedCharacters", JSON.stringify(characters));
		localStorage.setItem("tokens", JSON.stringify(tokens));
		setCharacters(characters);
	};

	const onSubmit = async (data: FormData) => {
		const userMessage: Message = {
			text: data.message,
			type: "text",
			sender: "user"
		};
		const updatedMessages = [...(messages ?? []), userMessage];
		setMessages(updatedMessages);
		saveMessagesToLocalStorage(updatedMessages);
		reset();

		setLoading(true);
		const params = {
			userId: user?.uid ?? "id",
			message: data.message,
			characterId: characterInfo?.id.toString() ?? ""
		};
		try {
			const response = await sendMessage(params);

			if (response && response?.response?.length > 0) {
				const botMessages = response?.response?.map((msg: BotMessage) => ({
					text: msg.message,
					type: msg.type,
					url: msg.url || "",
					sender: "bot" as const
				}));
				const updatedWithBotMessages = [...updatedMessages, ...botMessages];
				setMessages(updatedWithBotMessages);
				saveMessagesToLocalStorage(
					updatedWithBotMessages,
					response?.tokens_remaining
				);

				setTokens(response?.tokens_remaining || 0);
				const isPaywallMessage = botMessages.some((item) =>
					paidTypesOfMessages.includes(item.type)
				);
				if (isPaywallMessage && user?.isAnonymous) {
					setAuthModal({ modalType: "login", isAuthModalActive: true });
				}
				if (isPaywallMessage && !isPremium) {
					setPaywallModal(true);
				}
			}
		} catch (error) {
			console.error("Error sending message:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleModal = () => {
		setShowModal(!showModal);
	};

	const handleSelectMessage = (text: string) => {
		setValue("message", text);
		setShowModal(false);
		setFocus("message");
	};

	const onReset = () => {
		resetField("message");
		setFocus("message");
	};

	const handleDeleteMessage = (messageIndex: number) => {
		if (messages && characterInfo) {
			// Сохраняем удаляемое сообщение для проверки его типа и отправителя
			const deletedMessage = messages[messageIndex];

			// Удаляем сообщение из состояния
			const updatedMessages = [...messages];
			updatedMessages.splice(messageIndex, 1);
			setMessages(updatedMessages);

			// Удаляем сообщение из localStorage
			const storedData = localStorage.getItem("chatStartedCharacters");
			if (storedData) {
				const characters = JSON.parse(storedData);

				// Находим персонажа в localStorage
				const characterIndex = characters.findIndex(
					(char: Character) => char.id === characterInfo.id
				);

				if (characterIndex !== -1) {
					const character = characters[characterIndex];

					// Обновляем список сообщений у найденного персонажа
					character.listMsgs = updatedMessages;

					// Обновляем время последнего сообщения
					character.lastMessageTime = new Date();

					// Только для сообщений бота обновляем дополнительные коллекции
					if (deletedMessage.sender === "bot") {
						// Если удаляемое сообщение было изображением, обновляем массив фотографий
						if (
							(deletedMessage.type === "image" ||
								deletedMessage.type === "image_paywall") &&
							deletedMessage.url
						) {
							const url =
								typeof deletedMessage.url === "string"
									? deletedMessage.url
									: (deletedMessage.url?.en ?? "");

							if (character.photos && character.photos.includes(url)) {
								character.photos = character.photos.filter(
									(photo: string) => photo !== url
								);
							}
						}

						// Если удаляемое сообщение было видео, обновляем массив видео
						if (
							(deletedMessage.type === "video" ||
								deletedMessage.type === "video_paywall") &&
							deletedMessage.url
						) {
							const url =
								typeof deletedMessage.url === "string"
									? deletedMessage.url
									: (deletedMessage.url?.en ?? "");

							if (character.videos && character.videos.includes(url)) {
								character.videos = character.videos.filter(
									(video: string) => video !== url
								);
							}
						}

						// Если удаляемое сообщение было аудио, можно добавить обработку при необходимости
						if (
							(deletedMessage.type === "audio" ||
								deletedMessage.type === "audio_paywall") &&
							deletedMessage.url
						) {
							// Если в вашем приложении хранится коллекция аудио, обновите ее здесь
						}
					}

					// Сохраняем обновленные данные обратно в localStorage
					localStorage.setItem(
						"chatStartedCharacters",
						JSON.stringify(characters)
					);

					// Обновляем глобальное состояние персонажей
					setCharacters(characters);

					// При необходимости логирование удаления для отладки
					console.log(
						`Deleted message at index ${messageIndex} from ${deletedMessage.sender}`
					);
				}
			}
		}
	};

	const messageValue = watch("message");

	return (
		<div
			className={clsx(
				"flex h-[calc(100vh-142px)] flex-col justify-end rounded-[8px] bg-[#121423] p-[20px] transition-transform duration-300 md:h-[calc(100vh-262px)] md:rounded-[16px] md:px-[12px] md:py-[14px]",
				{}
			)}
		>
			<div className="flex h-full flex-col justify-between">
				<div className="space-y-[12px] overflow-auto pb-[20px]">
					<ChatsMessageText
						loading={loading}
						messages={messages}
						characterInfo={characterInfo}
						onDeleteMessage={handleDeleteMessage}
					/>
				</div>
				<div>
					{/* {!loading && (
            <div
              className={clsx("transition-opacity duration-300", {
                "pointer-events-none absolute opacity-0": loading,
              })}
            >
              <SuggestionAnswer
                waitingMessage={loading}
                userId={user?.uid ?? "id"}
                characterId={characterInfo?.id ?? null}
                onSelectMessage={handleSelectMessage}
              />
            </div>
          )} */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="relative flex items-end gap-[8px]"
					>
						{showModal && (
							<ChatsMessageModal
								onSelectMessage={handleSelectMessage}
								closeModal={() => setShowModal(false)}
							/>
						)}
						<div className="relative w-full">
							<TextareaAutosize
								{...register("message", {
									required: "Поле обязательно для заполнения"
								})}
								ref={(e) => {
									register("message").ref(e);
									textAreaRef.current = e;
								}}
								id="message"
								className="block min-h-[48px] w-full resize-none rounded-[16px] bg-[#21233A] p-[12px] pr-[160px] text-[14px] leading-[1.5em] placeholder:text-[14px] placeholder:opacity-50 focus:outline-none md:pr-[135px] sm:pr-[30px] sm:text-[16px]"
								placeholder={t("chats_your_message_here")}
								minRows={1}
								maxRows={3}
								onFocus={() => setIsTextareaFocused(true)}
								onBlur={() => setIsTextareaFocused(false)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										if (messageValue?.trim() && !loading) {
											handleSubmit(onSubmit)();
										}
									}
								}}
							/>
							<div className="absolute right-[20px] top-1/2 flex -translate-y-1/2 items-center gap-[10px] sm:right-[10px]">
								{messageValue && (
									<button onClick={onReset} className={"animate-fadeIn"}>
										<Image
											src={IconClose.src}
											width={IconClose.width}
											height={IconClose.height}
											alt="clean form"
										/>
									</button>
								)}
								<button
									onClick={handleModal}
									type="button"
									className={clsx(
										"flex h-[24px] items-center gap-[6px] rounded-[9px] bg-[#121423] px-[9px] transition-opacity duration-300",
										{
											"gradient-border": showModal,
											"md:hidden": isTextareaFocused || messageValue
										}
									)}
								>
									<Image
										src={showModal ? IconUploadGradient : IconUpload.src}
										width={IconUpload.width}
										height={IconUpload.height}
										alt="upload photos"
										className="size-[14px]"
									/>
									<span
										className={clsx("text-[12px] font-medium", {
											"logo-gradient": showModal
										})}
									>
										{" "}
										{t("chats_send_photo")}
									</span>
								</button>
							</div>
						</div>
						<button
							type="submit"
							disabled={!messageValue?.trim() || loading}
							className={clsx(
								"transition-bg flex size-[48px] shrink-0 items-center justify-center rounded-[16px] bg-[#21233A] duration-300 hover:bg-[#2E335B] disabled:pointer-events-none",
								{
									"bg-main-gradient": messageValue?.trim() && !loading
								}
							)}
						>
							<Image
								src={IconSend.src}
								width={IconSend.width}
								height={IconSend.height}
								alt="send message icon"
								className={clsx(
									"size-[24px] opacity-20 transition-opacity duration-300",
									{
										"!opacity-100": messageValue?.trim() && !loading
									}
								)}
							/>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChatsMessages;
