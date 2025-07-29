import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useGeoStore } from "@/app/shared/store/geoStore";
import IconCloseX from "@/../public/images/icons/icon-close-x.svg";
import UkBanner from "@/../public/images/img/geo-uk-ban-banner.png";

const GeoModal = () => {
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
							src={UkBanner}
							alt="uk-banner"
							width={UkBanner.width / 2}
							height={UkBanner.height / 2}
							className="mb-[24px]"
						/>
						<span className="mb-[8px] text-[20px] font-semibold leading-[22px]">
							Access Restricted for UK Users
						</span>
						<span className="mb-[12px] text-center text-[16px] font-medium opacity-50">
							Due to the new UK Online Safety Act requirements effective 25 July
							2025, our service is temporarily unavailable to users in the
							United Kingdom.
						</span>
						<span className="mb-[12px] text-center text-[16px] font-medium opacity-50">
							We are actively working on implementing age verification and
							compliance measures to meet the new legal standards
						</span>
						<span className="mb-[12px] text-center text-[16px] font-medium opacity-50">
							Your privacy and safety remain our priority, and we aim to restore
							access for UK users as soon as possible.
						</span>
						<span className="text-center text-[16px] font-medium opacity-50">
							Thank you for your understanding and patience. <br /> AiGo Team
						</span>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default GeoModal;
