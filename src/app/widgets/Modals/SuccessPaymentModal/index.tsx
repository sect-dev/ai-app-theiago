import React, { useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import ImageModal from "@/../public/images/img/image-modal.webp";
import SuccessPayment from "@/app/widgets/Modals/SuccessPaymentModal/SuccessPayment";
import SuccessAuth from "@/app/widgets/Modals/SuccessPaymentModal/SuccessAuth";
import { sendGTMEvent } from "@next/third-parties/google";
import * as fbq from "@/app/shared/lib/fbPixel";

const SuccessPaymentModal = () => {
	const {
		isSuccessPaymentModalActive,
		successPaymentModalType,
		setSuccessPaymentModal,
		selectedPlan
	} = usePaymentStore();

	const renderContent = () => {
		switch (successPaymentModalType) {
			case "subscription_success":
				return <SuccessPayment />;
			case "auth_success":
				return <SuccessAuth />;
			default:
				return <SuccessPayment />;
		}
	};

	return (
		<Dialog
			open={isSuccessPaymentModalActive}
			as="div"
			className="relative z-[70] focus:outline-none"
			onClose={() =>
				setSuccessPaymentModal({
					isSuccessPaymentModalActive: false,
					successPaymentModalType: null
				})
			}
		>
			<div className="font-lato fixed inset-0 z-[70] w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel
						transition
						className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
					>
						<div className="flex h-full w-screen flex-col items-center justify-center pt-[45px] sm:pt-0">
							<div className="relative mx-auto h-[550px] w-[690px] sm:size-full sm:overflow-x-hidden sm:bg-[#121423]">
								<div className="success-payment-bg relative hidden h-[400px] w-full sm:block">
									<Image
										src={ImageModal.src}
										fill
										alt="image modal"
										className="object-cover"
									/>
								</div>
								{renderContent()}
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default SuccessPaymentModal;
