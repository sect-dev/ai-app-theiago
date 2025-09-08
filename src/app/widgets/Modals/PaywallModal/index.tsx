import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import ImageGirls from "@/../public/images/img/paywall-banner-girls.png"
import SectionPlans from "@/app/flat-pages/Initpage/components/SectionPlans";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import { useAuthStore } from "@/app/shared/store/authStore";
import { getTrustPayProducts, TPProduct } from "@/app/shared/api/trustPay";
import { useEffect, useMemo, useState } from "react";
import { PaymentPlan } from "@/app/shared/api/payment";

const PaywallModal = () => {
  const { setPaywallModal, selectedCharacterName } = useAuthStore();

  const [products, setProducts] = useState<TPProduct[] | null>(null);

  useEffect(() => {
      getTrustPayProducts()
          .then((data) => setProducts(data));
  }, []);

  const paymentPlans = useMemo<PaymentPlan[]>(() => {
      if (!products) return [];

      products.sort((a, b) => {
        const aIsSub = a.kind === 'subscription' ? 0 : 1;
        const bIsSub = b.kind === 'subscription' ? 0 : 1;
        if (aIsSub !== bIsSub) return aIsSub - bIsSub;
        return Number(a.price) - Number(b.price);
      });
      return products.map((p) => {

        const [interval_length, interval_unit] = p.type ? p.type.split("_") : [p.tokens_amount, 'tokens'];
        return {
          id: p.product_id,
          currency: "USD",
          amount_initial: Number(p.price),
          amount_recurring: Number(p.price),
          interval_unit: interval_unit as "month" | "day" | "year" | "week",
          interval_length: interval_length as number,
          description: p.kind ?? "",
          tokens_included: p.tokens_amount ?? 0,
          places: [],
          schedule_id: "",
        }
      });
      }, [products]);


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
						<div className="flex h-[691px] w-[688px] flex-row gap-[20px] rounded-3xl bg-[#121423]  fm:w-screen fm:flex-col fm:rounded-none">
              <div className="grid grid-cols-2 w-full h-full fm:grid-cols-1">
                <div className="flex flex-col pl-[20px] pt-[20px] pr-[20px] overflow-y-auto">
                  <DialogTitle className="mb-4 text-left text-[20px] font-semibold">
                    Nice to see you again
                  </DialogTitle>

                  <SectionPlans isOrganic={true} paymentPlans={paymentPlans} />

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
              <SectionPlans isOrganic={true} paymentPlans={paymentPlans} />
              </div>
          </DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default PaywallModal;
