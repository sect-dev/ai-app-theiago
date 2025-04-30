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
      <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="fm:w-screen fm:h-fit flex fm:flex-col flex-row gap-[20px] h-[447px] bg-[#121423] p-[20px] rounded-3xl fm:rounded-none">
              <div className="fm:pt-[370px]">
                <DialogTitle className="text-[20px] mb-[16px] font-semibold text-left">
                  Nice to see you again,
                  <br />
                  {`${user?.displayName}`}
                </DialogTitle>
                <div className="">
                  <div className="flex justify-between items-start bg-blue-500 text-white p-[16px] rounded-t-[24px] bg-[#21233A] transition-bg duration-300 hover:bg-[#2E335B] mb-[4px]">
                    <div className="flex flex-col">
                      <span className="text-[16px] font-semibold mb-[8px]">
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

                    <div className="main-gradient py-[2px] rounded-[8px] px-[8px] flex items-center justify-center">
                      <span className="text-[14px] font-medium text-white relative z-[5]">
                        {active ? "Active" : "Expired"}
                      </span>
                    </div>
                  </div>
                  <button
                    className="fm:mb-0 bg-blue-500 text-[14px] mb-[106px] font-bold w-full pt-[8px] pb-[8px] text-white rounded-t-[4px] rounded-b-[24px] bg-[#21233A] shrink-0 transition-bg duration-300 hover:bg-[#2E335B]"
                    onClick={requestCancelSubscription}
                  >
                    Cancel Subscription
                  </button>

                  <div className="fm:hidden flex flex-col items-center justify-center text-center">
                    <span className="text-[12px] font-medium opacity-80 leading-[16px] p-[10px]">
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
                    <div className="flex text-[12px] font-medium opacity-50 leading-[24px] gap-[32px]">
                      <span className="block">Terms</span>
                      <span className="block">Privacy</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col fm:p-0 pl-[20px] border-l border-l-[#2B2D44] border-opacity-50 fm:border-none relative">
                <div className="flex justify-between items-start mb-[16px] ">
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
                    className="fm:hidden p-[8px] bg-[#191B2C] rounded-[12px] flex items-center justify-center"
                  >
                    <Image
                      src={IconClose.src}
                      width={IconClose.width}
                      height={IconClose.height}
                      alt="close"
                    />
                  </button>
                </div>

                <ul className="fm:mb-[10px] fm:flex-1 fm:min-h-0 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {SUBSCRIPTION_INCLUDES.map((item) => (
                    <li
                      key={item.id}
                      className={clsx(
                        "font-medium mb-[4px] p-[12px] bg-blue-500 text-white rounded-[4px] bg-[#21233A] shrink-0 transition-bg duration-300 hover:bg-[#2E335B]",
                        item.className,
                      )}
                    >
                      {item.icon} {item.text}
                    </li>
                  ))}
                </ul>

                <div className="hidden fm:block mb-[16px] flex flex-col items-center text-center">
                  <span className=" text-[12px] font-medium opacity-80 leading-[16px] px-[10px] mx-auto">
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
                  <div className="flex mt-[10px] justify-center text-[12px] font-medium opacity-50 leading-[24px] gap-[32px]">
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
