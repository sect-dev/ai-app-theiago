import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import ImageAgeConfirmation from "@/../public/images/img/ageconfirmation.png";
import { useTranslations } from "next-intl";

interface AgeVerifyModalProps {
	onConfirm: () => void;
	onDecline: () => void;
}

const AgeVerifyModal = (props: AgeVerifyModalProps) => {
	const { onConfirm, onDecline } = props;
	const t = useTranslations("ConfirmAgeModal");

	return (
		<Dialog
			open={true}
			onClose={() => {}}
			className="relative z-50 font-bai-jamjuree"
		>
			<div className="fixed inset-0 flex w-screen items-center justify-center">
				<DialogPanel
					transition
					className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
				>
					<div className="flex flex-col items-center justify-center">
						<div className="relative mx-auto flex h-[432px] w-[328px] flex-col items-center justify-center gap-[24px] rounded-3xl bg-[#121423] p-[20px]">
							<div>
								<Image
									src={ImageAgeConfirmation.src}
									width={ImageAgeConfirmation.width}
									height={ImageAgeConfirmation.height}
									alt="image modal"
									className="object-cover"
								/>
							</div>
							<div className="gap-[12px] text-center">
								<span className="block text-[24px] font-semibold">
									{t("confirm_age_title")}
								</span>
								<span className="block text-[16px] font-medium">
									{t("confirm_age_description")}
								</span>
							</div>

							<div className="flex w-full flex-col gap-2">
								<button
									onClick={onConfirm}
									className="main-gradient rounded-xl px-4 py-2 text-[15px] font-bold text-white"
								>
									<span className="relative z-[5]">
										{t("confirm_age_button")}
									</span>
								</button>
								<button
									onClick={onDecline}
									className="bg-blue-500 transition-bg shrink-0 rounded-xl bg-[#21233A] px-4 py-2 text-[15px] font-bold text-white duration-300 hover:bg-[#2E335B]"
								>
									{t("confirm_age_decline")}
								</button>
							</div>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default AgeVerifyModal;
