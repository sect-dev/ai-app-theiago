import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import ImageError from "@/../public/images/img/error.png";
import { useCharacterCreateStore } from "@/app/shared/store/createCharacterStore";
import ImageErrorModal from "@/../public/images/img/image-error-modal.png";
import IconCloseX from "@/../public/images/icons/icon-close-x.svg";
import Link from "next/link";

const ErrorModal = () => {
	const { setIsErrorModalActive } = useCharacterCreateStore();

	const handleClose = () => {
		setIsErrorModalActive(false);
	};

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
					<div className="relative flex w-[528px] flex-col items-center justify-center rounded-[24px] bg-[#121423] p-[20px] md:w-[343px]">
						<Image
							src={ImageErrorModal}
							alt="error"
							width={ImageErrorModal.width}
							height={ImageErrorModal.height}
							className="mb-[24px]"
						/>
						<span className="mb-[8px] text-[20px] font-semibold leading-[22px]">
							Try Another Prompt
						</span>
						<span className="mb-[24px] text-center text-[16px] font-medium opacity-50">
							All content must comply with our Terms & Conditions{" "}
							<Link href="/terms" className="text-[#058BEA]">
								Terms & Conditions{" "}
							</Link>
							otherwise, your account will be blocked. If you believe this is an
							error, please contact our Support Team
						</span>

						<button
							onClick={handleClose}
							className="cursor-pointer rounded-[8px] bg-main-gradient px-[16px] py-[8px]"
						>
							<span className="text-[16px] font-bold leading-[150%] text-white">
								Ok
							</span>
						</button>

						<button
							onClick={handleClose}
							className="absolute right-[20px] top-[20px] cursor-pointer rounded-[12px] bg-[#2D304B] p-[8px]"
						>
							<Image
								src={IconCloseX}
								alt="close"
								width={IconCloseX.width}
								height={IconCloseX.height}
								className="h-[16px] w-[16px]"
							/>
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default ErrorModal;
