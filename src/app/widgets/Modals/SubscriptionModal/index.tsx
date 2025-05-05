import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import {
  SubscriptionData,
  useSubscriptionStore,
} from "@/app/shared/store/subscriptionStore";
import clsx from "clsx";
import IconClose from "@/../public/images/icons/icon-close-x.svg";
import { useAuthStore } from "@/app/shared/store/authStore";
import { formatISODate } from "@/app/shared/helpers";

const SUBSCRIPTION_INCLUDES = [
  {
    id: 1,
    icon: "💬",
    text: "Dialogues on any topics",
    className: "rounded-t-[24px]",
  },
  {
    id: 2,
    icon: "📷",
    text: "300 photos in any poses",
  },
  {
    id: 3,
    icon: "💸",
    text: "100 free tokens every day",
  },
  {
    id: 4,
    icon: "🍓",
    text: "NSFW support for 18+ users",
  },
  {
    id: 5,
    icon: "❤️",
    text: "Create your own girlfriends",
  },
  {
    id: 6,
    icon: "🔥",
    text: "Video and audio content",
  },
  {
    id: 7,
    icon: "🧠",
    text: "Character memory and awareness",
  },
  {
    id: 8,
    icon: "👧",
    text: "Dialogues like a real girls",
  },
  {
    id: 9,
    icon: "💕",
    text: "The full experience of a relationship",
  },
  {
    id: 10,
    icon: "⭐",
    text: "No annoying ads",
    className: "rounded-b-[24px]",
  },
];

const SubscriptionModal = () => {
  const {
    subscriptionData,
    closeSubscriptionModal,
    requestCancelSubscription,
    isCancelSuccess,
  } = useSubscriptionStore();
  const { user } = useAuthStore();
  if (!subscriptionData) {
    console.log("subscription data is not found");
    return null;
  }

  const { active, cancelled, end, start, price, productId }: SubscriptionData =
    subscriptionData;

  const calculateSubscriptionPeriod = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffMs = endDate.getTime() - startDate.getTime();

    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    // Определяем тип подписки
    if (diffDays <= 1) return "Daily";
    if (diffDays <= 31) return "Monthly";
    if (diffDays <= 93) return "3 Month"; // ~3 месяца (31*3)
    if (diffDays <= 183) return "6 Month"; // ~6 месяцев (30.5*6)

    return "premium";
  };

  const chargeDate = formatISODate(end, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog
      open={true}
      as="div"
      className="relative z-10 font-bai-jamjuree"
      onClose={requestCancelSubscription}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="flex h-[447px] flex-row gap-[20px] rounded-3xl bg-[#121423] p-[20px] fm:h-fit fm:w-screen fm:flex-col fm:rounded-none">
              <div className="fm:pt-[370px]">
                <DialogTitle className="mb-[16px] text-left text-[20px] font-semibold">
                  Nice to see you again,
                  <br />
                  {`${user?.displayName}`}
                </DialogTitle>
                <div className="">
                  <div className="bg-blue-500 transition-bg mb-[4px] flex items-start justify-between rounded-t-[24px] bg-[#21233A] p-[16px] text-white duration-300 hover:bg-[#2E335B]">
                    <div className="flex flex-col">
                      <span className="mb-[8px] text-[16px] font-semibold">
                        {calculateSubscriptionPeriod(start, end)} subscription
                      </span>
                      <span
                        className={clsx("text-[14px] font-medium", {
                          "mb-[8px]": isCancelSuccess,
                        })}
                      >
                        You will be charged ${price} on
                        <br />
                        {chargeDate}
                      </span>
                      {isCancelSuccess && (
                        <span className="text-[14px] font-medium">
                          No additional charges will be applied
                        </span>
                      )}
                    </div>

                    <div className="main-gradient flex items-center justify-center rounded-[8px] px-[8px] py-[2px]">
                      <span className="relative z-[5] text-[14px] font-medium text-white">
                        {active ? "Active" : "Expired"}
                      </span>
                    </div>
                  </div>
                  <button
                    className="bg-blue-500 transition-bg mb-[106px] w-full shrink-0 rounded-b-[24px] rounded-t-[4px] bg-[#21233A] pb-[8px] pt-[8px] text-[14px] font-bold text-white duration-300 hover:bg-[#2E335B] fm:mb-0"
                    onClick={requestCancelSubscription}
                  >
                    Cancel Subscription
                  </button>

                  <div className="flex flex-col items-center justify-center text-center fm:hidden">
                    <span className="p-[10px] text-[12px] font-medium leading-[16px] opacity-80">
                      If you can&apos;t cancel your subscription, feel free to
                      <br />
                      reach out to us at:{" "}
                      <Link
                        href="mailto:theaigo@aigo.com"
                        prefetch={false}
                        className="underline"
                      >
                        theaigo@aigo.com
                      </Link>
                    </span>
                    <div className="flex gap-[32px] text-[12px] font-medium leading-[24px] opacity-50">
                      <span className="block">Terms</span>
                      <span className="block">Privacy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col border-l border-l-[#2B2D44] border-opacity-50 pl-[20px] fm:border-none fm:p-0">
                <div className="mb-[16px] flex items-start justify-between">
                  <DialogTitle className="text-[20px] font-semibold">
                    <span className="fm:hidden">
                      Your subscription
                      <br />
                      includes
                    </span>
                    <span className="hidden fm:inline">
                      Your subscription includes
                    </span>
                  </DialogTitle>
                  <button
                    onClick={closeSubscriptionModal}
                    className="flex items-center justify-center rounded-[12px] bg-[#191B2C] p-[8px] fm:hidden"
                  >
                    <Image
                      src={IconClose.src}
                      width={IconClose.width}
                      height={IconClose.height}
                      alt="close"
                    />
                  </button>
                </div>

                <ul className="overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] fm:mb-[10px] fm:min-h-0 fm:flex-1 [&::-webkit-scrollbar]:hidden">
                  {SUBSCRIPTION_INCLUDES.map((item) => (
                    <li
                      key={item.id}
                      className={clsx(
                        "bg-blue-500 transition-bg mb-[4px] shrink-0 rounded-[4px] bg-[#21233A] p-[12px] font-medium text-white duration-300 hover:bg-[#2E335B]",
                        item.className,
                      )}
                    >
                      {item.icon} {item.text}
                    </li>
                  ))}
                </ul>

                <div className="mb-[16px] flex hidden flex-col items-center text-center fm:block">
                  <span className="mx-auto px-[10px] text-[12px] font-medium leading-[16px] opacity-80">
                    If you can&apos;t cancel your subscription, feel free to
                    reach out to us at:{" "}
                    <Link
                      href="mailto:theaigo@aigo.com"
                      prefetch={false}
                      className="underline"
                    >
                      theaigo@aigo.com
                    </Link>
                  </span>
                  <div className="mt-[10px] flex justify-center gap-[32px] text-[12px] font-medium leading-[24px] opacity-50">
                    <span className="block">Terms</span>
                    <span className="block">Privacy</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SubscriptionModal;
