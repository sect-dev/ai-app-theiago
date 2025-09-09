import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import ImageGirls from "@/../public/images/img/paywall-banner-girls.png"
import SectionPlans from "@/app/flat-pages/Initpage/components/SectionPlans";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import { useAuthStore } from "@/app/shared/store/authStore";
import { useProductsToBuyStore } from "@/app/shared/store/productsToBuyStore";

const PaywallModal = () => {
  const { setPaywallModal, selectedCharacterName, isPremium } = useAuthStore();

  const { subscriptionPlans, tokenPlans } = useProductsToBuyStore();

	return (
		<Dialog
			open={true}
			as="div"
			className="relative z-10 font-bai-jamjuree "
			onClose={() => {}}
		>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel
						transition
						className="data-[closed]:transform-[scale(95%)] fm:hidden flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
					>
						<div className="flex h-[691px] max-h-[85%] w-[688px] flex-row gap-[20px] rounded-3xl bg-[#121423]  fm:w-screen fm:flex-col fm:rounded-none">
              <div className="grid grid-cols-2 w-full h-full fm:grid-cols-1">
                <div className="flex flex-col pl-[20px] pt-[20px] pr-[20px] overflow-y-auto">
                  <DialogTitle className="mb-4 text-left text-[20px] font-semibold">
                    Nice to see you again
                  </DialogTitle>

                  <SectionPlans isOrganic={true} paymentPlans={isPremium ? tokenPlans() : subscriptionPlans()} />

                </div>
                <div className="flex items-center justify-center fm:hidden relative">
                  <Image src={ImageGirls} alt="Image Girls" className="w-full h-full object-cover rounded-r-[24px]" />

                <button
                  onClick={() =>
                  	setPaywallModal(false)
                  }
                  className="absolute right-[20px] top-[20px] z-[10] flex size-[32px] items-center justify-center rounded-[12px] sm:left-[20px] sm:right-auto sm:top-[70px]"
                  style={{ backgroundColor: "rgba(25, 27, 44, 0.2)" }}
                >
                  <Image
                    src={IconClose.src}
                    width={IconClose.width}
                    height={IconClose.height}
                    alt="icon close"
                  />
                </button>
                </div>
              </div>
						</div>
					</DialogPanel>

          <DialogPanel className="hidden fm:block data-[closed]:transform-[scale(95%)] h-screen w-full items-center justify-center overflow-y-auto bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0">
            <div className="pt-[100px] px-[20px]">
                              <button
                  onClick={() =>
                  	setPaywallModal(false)
                  }
                  className="right-[20px] top-[20px] z-[10] flex size-[32px] items-center justify-center bg-[#191B2C] mb-[12px] rounded-[12px] sm:left-[20px] sm:right-auto sm:top-[70px]"
                >
                  <Image
                    src={IconClose.src}
                    width={IconClose.width}
                    height={IconClose.height}
                    alt="icon close"
                  />
                </button>
              <div className="text-[20px] font-semibold mb-[12px] leading-[28px]">Get Closer With {selectedCharacterName}</div>
              <div className="text-[16px] font-normal mb-[16px] text-[#B5B5B5]">Unlock All Features!</div>
              <SectionPlans isOrganic={true} paymentPlans={isPremium ? tokenPlans() : subscriptionPlans()} />
              </div>
          </DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default PaywallModal;
