import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import ImageModal from "@/../public/images/img/image-modal.webp";
import IconCamera from "@/../public/images/icons/icon-camera.svg";
import ImageQr from "@/../public/images/img/image-qr.svg";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";

const QrModal = () => {
	const { isQrModalActive, setQrModal } = useSelectedCardStore();

	return (
		<Dialog
			open={isQrModalActive}
			as="div"
			className="relative z-10 focus:outline-none"
			onClose={() => setQrModal(false)}
		>
			<div className="font-lato fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel
						transition
						className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
					>
						<div className="flex h-full w-screen flex-col items-center justify-center sm:pt-[80px]">
							<div className="relative flex w-[690px] justify-between overflow-hidden rounded-[24px] md:w-[590px] sm:w-[88vw] sm:overflow-visible">
								<button
									onClick={() => setQrModal(false)}
									className="absolute right-[20px] top-[20px] z-[10] flex size-[32px] items-center justify-center rounded-[12px] bg-[#191B2C] sm:top-[-50px]"
								>
									<Image
										src={IconClose.src}
										width={IconClose.width}
										height={IconClose.height}
										alt="icon close"
									/>
								</button>
								<div className="w-full space-y-[16px] bg-[#121423] p-[20px] sm:flex sm:h-full sm:flex-col sm:items-center sm:justify-center">
									<div className="space-y-[12px]">
										<p className="text-[20px] font-semibold">
											Get the App for full experience!
										</p>
										<p className="text-[16px font-medium]">
											Download the AiGo app and your girls will be in your
											pocket!
										</p>
									</div>
									<div className="size-[308px] rounded-[32px] bg-white p-[26px] sm:size-[250px]">
										<div className="relative size-[254px] sm:size-[200px]">
											<Image src={ImageQr.src} fill alt="qr code image" />
										</div>
									</div>
									<div className="flex items-center gap-[8px] rounded-[24px] bg-[#282B42] px-[16px] py-[12px]">
										<Image
											src={IconCamera.src}
											width={IconCamera.width}
											height={IconCamera.height}
											alt="icon camera"
										/>
										<p>
											Scan the code with your phone&apos;s camera to download!
										</p>
									</div>
								</div>
								<div className="h-hull relative w-full sm:hidden">
									<Image
										src={ImageModal.src}
										fill
										alt="image modal"
										className="object-cover"
									/>
									<Link
										href="/"
										className="absolute bottom-[20px] left-[20px] block text-[34px] font-bold tracking-[0.04em] sm:text-[5.33vw]"
									>
										<span className="logo-gradient">Ai</span>
										<span className="">Go</span>
									</Link>
								</div>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default QrModal;
