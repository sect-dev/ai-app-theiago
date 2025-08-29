import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import ImageGirls from "@/../public/images/img/paywall-banner-girls.png"
import SectionPlans from "@/app/flat-pages/Initpage/components/SectionPlans";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import { useAuthStore } from "@/app/shared/store/authStore";

// TODO: Add payment plans from backend when payment system is ready
type PaymentPlan = {
  id: string;
  currency: string;
  amount_initial: number;
  amount_recurring: number;
  interval_unit: "month" | "day" | "year" | "week";
  interval_length: number;
  description: string;
  tokens_included: number;
  places: string[];
  schedule_id: string;
};

const paymentPlans: PaymentPlan[] = [
  {
    id: "1_day_premium_access",
    currency: "USD",
    amount_initial: 0.2,
    amount_recurring: 0.2,
    interval_unit: "day",
    interval_length: 1,
    description: "1 day premium access",
    tokens_included: 10,
    places: ["landing-paywall"],
    schedule_id: "df9c6dfa-2428-11f0-b499-5e3b1ae81057",
  },
  {
    id: "1_month_premium_access",
    currency: "USD",
    amount_initial: 14.99,
    amount_recurring: 14.99,
    interval_unit: "month",
    interval_length: 1,
    description: "1 month premium access",
    tokens_included: 50,
    places: ["landing-paywall"],
    schedule_id: "df9c6dfa-2428-11f0-b499-5e3b1ae81058",
  },
  {
    id: "3_months_premium_access",
    currency: "USD",
    amount_initial: 24.99,
    amount_recurring: 24.99,
    interval_unit: "month",
    interval_length: 3,
    description: "3 months premium access",
    tokens_included: 200,
    places: ["landing-paywall"],
    schedule_id: "df9c6dfa-2428-11f0-b499-5e3b1ae81059",
  },
  {
    id: "6_months_premium_access",
    currency: "USD",
    amount_initial: 49.99,
    amount_recurring: 49.99,
    interval_unit: "month",
    interval_length: 6,
    description: "6 months premium access",
    tokens_included: 500,
    places: ["landing-paywall"],
    schedule_id: "df9c6dfa-2428-11f0-b499-5e3b1ae81060",
  },
];

const PaywallModal = () => {
  const { setPaywallModal } = useAuthStore();

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

          <DialogPanel className="hidden fm:block data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center overflow-y-auto bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0">
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
              <div className="text-[20px] font-semibold mb-[12px] leading-[28px]">Get Closer With</div>
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