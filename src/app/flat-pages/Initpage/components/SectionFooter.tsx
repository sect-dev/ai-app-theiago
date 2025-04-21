import React, {FC} from 'react';
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import ImageMastercard from "@/../public/images//icons/payment/1.png";
import ImageVisa from "@/../public/images/icons/payment/2.png";
import ImageStripe from "@/../public/images/icons/payment/3.svg";
import ImageMc from "@/../public/images/icons/payment/4.svg";
import {usePaymentStore} from "@/app/shared/store/paymentStore";
import {PaymentPlan} from "@/app/shared/api/payment";
interface ComponentProps {
  paymentPlans: PaymentPlan[]
}
const SectionFooter:FC<ComponentProps> = ({paymentPlans}) => {
  const {selectedPlan} = usePaymentStore();
  const currentPlan = paymentPlans.find(item => item.id === selectedPlan)

  return (
    <div className="text-center overflow-hidden font-bai-jamjuree mx-auto pt-[20px] pb-[10px] sm:pb-[2.778vw] sm:max-w-[91vw] sm:pt-[5.56vw]">
      <div className="flex items-center gap-[10px] mb-[15px]">
        <input
          type="checkbox"
          defaultChecked
          name="ssd"
          className={clsx('shrink-0 border border-[#8E59FF] before:!rounded-[5px] rounded-[8px] size-[26px] cursor-pointer appearance-none border-[#5E56E7] bg-transparent checked:bg-[url("/images/icons/payment/check.svg")] bg-[3px] bg-center bg-no-repeat', {
          })}
        />
        <p className="text-left text-[#6D6D6D] leading-[1.2em] font-medium text-[12px] tracking-[-0.04em]">
          By completing this transaction you certify that you are 18 years or older and agree to our
          <span className="!inline bg-button-gradient bg-clip-text text-transparent text-gradient"> Privacy Policy, Terms of Use  and Cacellation Policy</span>
        </p>
      </div>
      <p className="text-center text-[#6D6D6D] text-[12px] font-medium tracking-[-0.04em] leading-[1.2em] sm:text-[3.333vw]">
        The charges on your credit card statement will appear as DevSect
      </p>
      <p className="text-center text-[#6D6D6D] text-[12px] font-medium mb-[10px] tracking-[-0.04em] leading-[1.2em] sm:text-[3.333vw]">
        Without cancellation before the selected plan ends, i accept that AiGo will automatically charge
        USD {`${currentPlan?.amount_initial}`} every {`${currentPlan?.interval_length}`} {`${currentPlan?.interval_unit}`} until i cancel. Cancel online via the account page on the app.
      </p>
      <div className="pb-[0.6px] pt-[0.6vw] sm:pt-[3.5]">
        <div className="max-w-[330px] mx-auto">
          <div className="flex justify-center gap-[1vw] mb-[1.25vw] sm:mb-[3.89vw] sm:gap-[2.22vw]">
            <div className="bg-[#fff] flex items-center overflow-hidden justify-center border-[#D9D9D9] border-[1px] w-[4.5vw] h-[2.5vw] rounded-[0.4vw] sm:w-[16.11vw] sm:h-[10.83vw] sm:rounded-[2.78vw]">
              <Image
                src={ImageMastercard.src}
                width={ImageMastercard.width}
                height={ImageMastercard.height}
                alt="Image Mastercard"
                className="sm:w-[14.72vw] sm:h-[5.28vw]"
              />
            </div>
            <div className="bg-[#fff] flex items-center overflow-hidden justify-center border-[#D9D9D9] border-[1px] w-[4.5vw] h-[2.5vw] rounded-[0.4vw] sm:w-[16.11vw] sm:h-[10.83vw] sm:rounded-[2.78vw]">
              <Image
                src={ImageVisa.src}
                width={ImageVisa.width}
                height={ImageVisa.height}
                alt="Image Stripe"
                className="sm:w-[14.72vw] sm:h-[5.28vw]"
              />
            </div>
            <div className="bg-[#fff] flex items-center overflow-hidden justify-center border-[#D9D9D9] border-[1px] w-[4.5vw] h-[2.5vw] rounded-[0.4vw] sm:w-[16.11vw] sm:h-[10.83vw] sm:rounded-[2.78vw]">
              <Image
                src={ImageStripe.src}
                width={ImageStripe.width}
                height={ImageStripe.height}
                alt="Image Stripe"
                className="sm:w-[14.72vw] sm:h-[5.28vw]"
              />
            </div>
            <div className="bg-[#fff] flex items-center overflow-hidden justify-center border-[#D9D9D9] border-[1px] w-[4.5vw] h-[2.5vw] rounded-[0.4vw] sm:w-[16.11vw] sm:h-[10.83vw] sm:rounded-[2.78vw]">
              <Image
                src={ImageMc.src}
                width={ImageMc.width}
                height={ImageMc.height}
                alt="Image Stripe"
                className="sm:w-[11.11vw] sm:h-[3.33vw]"
              />
            </div>
          </div>
          <p className="text-[#6D6D6D] leading-[1.2em] text-[12px] sm:text-[3.333vw] mb-[8px] sm:mb-[2vw]">
            DevSect FZE LLC BLB-BC5-840 <br/> AMC - BOULEVARD-B BUILDING, Ajman, United Arab Emirates
          </p>
        </div>
      </div>

      <div className="flex items-center gap-[5px] justify-between font-medium text-[14px] sm:text-[3.889vw]">
        <Link className="transition-all duration-300 border-b-[1px] border-b-transparent hover:border-b-white"
              href="https://app.theaigo.com/terms">Terms of use</Link>
        <Link className="transition-all duration-300 border-b-[1px] border-b-transparent hover:border-b-white"
              href="https://app.theaigo.com/privacy">Privacy</Link>
        <Link className="transition-all duration-300 border-b-[1px] border-b-transparent hover:border-b-white"
              href="https://app.theaigo.com/cancellation">Cancellation policy</Link>
      </div>
    </div>

  );
};

export default SectionFooter;