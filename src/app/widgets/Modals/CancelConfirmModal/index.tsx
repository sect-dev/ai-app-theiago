import { useSubscriptionStore } from "@/app/shared/store/subscriptionStore";
import { Dialog, DialogPanel } from "@headlessui/react";
import IconClose from "@/../public/images/icons/icon-close-x.svg";
import Image from "next/image";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useRouter } from "next/navigation";

const CancelConfirmModal = () => {
	const { recentChats, confirmCancelSubscription, declineCancelSubscription } =
		useSubscriptionStore();
	const { setSelectedCharacterId } = useSelectedCardStore();
	const router = useRouter();

	const handleChatChange = (chatId: number | string | undefined) => {
		declineCancelSubscription();

		if (chatId) {
			setSelectedCharacterId(chatId);
		}

		router.push(`/chats`);
	};

	return (
		<Dialog
			open={true}
			onClose={() => {}}
			className="relative z-10 font-bai-jamjuree"
		>
			<div className="fixed inset-0 flex w-screen items-center justify-center">
				<DialogPanel
					transition
					className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
				>
					<div className="flex flex-col items-center justify-center">
						<div className="relative flex flex-col items-center justify-center rounded-3xl bg-[#121423] p-[20px] fm:h-screen fm:w-screen fm:rounded-none fm:p-0">
							<div className="flex items-start">
								<div className="mb-[16px] flex flex-col items-center justify-center">
									<span className="flex items-start text-[32px] font-semibold fm:mt-[12px]">
										You&apos;re leaving us?
									</span>
									{recentChats && recentChats.length > 0 && (
										<span className="text-[16px] font-normal opacity-50">
											{recentChats[0].name} will be sad
										</span>
									)}
								</div>
								<button
									onClick={declineCancelSubscription}
									className="absolute right-0 top-0 mr-[20px] mt-[20px] flex items-center justify-center rounded-[12px] bg-[#191B2C] p-[8px] fm:hidden"
								>
									<Image
										src={IconClose.src}
										width={IconClose.width}
										height={IconClose.height}
										alt="close"
									/>
								</button>
							</div>
							<div className="mb-[27px] flex w-[688px] gap-[8px] overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] fm:w-full fm:pl-[16px] [&::-webkit-scrollbar]:hidden">
								{recentChats &&
									recentChats.length > 0 &&
									recentChats.map((char) => (
										<div
											key={char.id}
											className="relative h-[332px] w-[282px] flex-shrink-0"
										>
											<Image
												src={`${char.image}?format=webp&quality=100&width=600&height=660&fit=crop`}
												width={282}
												height={332}
												alt="Character"
												className="h-full w-full rounded-[24px] object-cover"
												loading="lazy"
											/>

											<div className="absolute inset-0 rounded-[24px] bg-card-gradient" />

											<div className="absolute bottom-0 left-0 right-0 p-4">
												<p className="truncate text-lg font-medium text-white">
													{char.name}
												</p>
											</div>
										</div>
									))}
							</div>
							<div className="mb-[20px] flex w-full items-center justify-center px-[16px]">
								{recentChats && (
									<button
										onClick={() =>
											handleChatChange(
												recentChats && recentChats.length > 0
													? recentChats[0].id
													: undefined
											)
										}
										className="button-gradient main-gradient h-[60px] w-[308px] rounded-[24px] text-[14px] font-bold fm:w-full"
									>
										<span className="relative z-[5]">Go to chat</span>
									</button>
								)}
							</div>

							<button onClick={confirmCancelSubscription}>
								<span className="font-noto-sans text-[14px] font-bold">
									Cancel anyway
								</span>
							</button>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default CancelConfirmModal;
