import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import ImagePaymentRandom from "@/../public/images/img/image-payment-random.webp";
import PaymentAdvantages from "@/app/widgets/Payment/PaymentAdvantages";
import PaymentPrice from "@/app/widgets/Payment/PaymentPrice";
import PaymentDiscountBanner from "@/app/widgets/Payment/PaymentDiscountBanner";
import { getPaymentPlans, PaymentPlan } from "@/app/shared/api/payment";
import PaymentPriceSkeleton from "@/app/widgets/Payment/PaymentPrice/PaymentPriceSkeleton";
import { PreparedAvatar } from "@/app/shared/api/types";
import { useParams } from "next/navigation";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";

const PaymentModal = () => {
  const { isPaymentModalActive, setPaymentModal } = usePaymentStore();
  const { characters } = useSelectedCardStore();
  const [plans, setPlans] = useState<PaymentPlan[] | null>(null);
  const params = useParams();
  const [character, setCharacter] = useState<PreparedAvatar | null>(null);
  const image = character ? character.image : ImagePaymentRandom.src;

  useEffect(() => {
    if (params?.id && characters) {
      const characterId = Number(params.id);
      if (!isNaN(characterId)) {
        const currentCharacter = characters.find(
          (item: PreparedAvatar) =>
            item.id !== undefined && Number(item.id) === characterId,
        );
        setCharacter(currentCharacter ?? null);
      }
    }
  }, []);

  const paymentPlans = async () => {
    try {
      const response = await getPaymentPlans();
      if (response) {
        setPlans(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    paymentPlans();
  }, []);

  return (
    <Dialog
      open={isPaymentModalActive}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setPaymentModal(false)}
    >
      <div className="font-lato fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="flex h-full w-screen flex-col items-center overflow-y-auto pt-[45px]">
              <PaymentDiscountBanner />
              <div className="relative sm:size-full">
                <button
                  onClick={() => setPaymentModal(false)}
                  className="absolute left-[20px] top-[35px] z-[10] flex size-[32px] items-center justify-center rounded-[12px] bg-[#191B2C] sm:left-[20px] sm:right-auto"
                >
                  <Image
                    src={IconClose.src}
                    width={IconClose.width}
                    height={IconClose.height}
                    alt="icon close"
                  />
                </button>

                <div className="pt-[25px]">
                  <p className="text-center font-bai-jamjuree text-[36px] font-semibold">
                    Choose your relationships
                  </p>
                  <div className="flex gap-[15px] pt-[25px]">
                    <div className="card-reverse relative h-[523px] w-[365px] shrink-0 overflow-hidden rounded-[34px] p-[25px]">
                      <Image
                        src={image}
                        fill
                        alt="image"
                        className="object-cover"
                      />
                      <p className="relative z-[5] font-bai-jamjuree text-[33px] font-semibold leading-[1.2em]">
                        Get closer with {character ? character.name : "them"}
                      </p>
                    </div>
                    {plans ? (
                      <PaymentPrice plans={plans} />
                    ) : (
                      <PaymentPriceSkeleton />
                    )}
                    <PaymentAdvantages />
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

export default PaymentModal;
