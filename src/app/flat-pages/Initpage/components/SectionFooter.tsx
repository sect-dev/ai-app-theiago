import React, { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import ImageMastercard from "@/../public/images//icons/payment/1.png";
import ImageVisa from "@/../public/images/icons/payment/2.png";
import ImageStripe from "@/../public/images/icons/payment/3.svg";
import ImageMc from "@/../public/images/icons/payment/4.svg";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { PaymentPlan } from "@/app/shared/api/payment";
import { useTranslations } from "next-intl";

interface ComponentProps {
  paymentPlans: PaymentPlan[];
}
const SectionFooter: FC<ComponentProps> = ({ paymentPlans }) => {
  const t = useTranslations("Paywall");
  const { selectedPlan } = usePaymentStore();
  const currentPlan = paymentPlans.find((item) => item.id === selectedPlan);

  return (
    <div className="mx-auto overflow-hidden pb-[10px] pt-[20px] text-center font-bai-jamjuree sm:max-w-[91vw] sm:pb-[2.778vw] sm:pt-[5.56vw]">
      <div className="mb-[15px] flex items-center gap-[10px]">
        <input
          type="checkbox"
          defaultChecked
          name="ssd"
          className={clsx(
            'size-[26px] shrink-0 cursor-pointer appearance-none rounded-[8px] border border-[#5E56E7] border-[#8E59FF] bg-transparent bg-[3px] bg-center bg-no-repeat before:!rounded-[5px] checked:bg-[url("/images/icons/payment/check.svg")]',
            {},
          )}
        />
        <p className="text-left text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D]">
          {t(
            "footer_by_completing_this_transaction_you_certify_that_you_are_18_years_or_older_and_agree_to_our",
          )}
          <span className="text-gradient !inline bg-button-gradient bg-clip-text text-transparent">
            {" "}
            {t("footer_privacy_policy")}
          </span>
        </p>
      </div>
      <p className="text-center text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D] sm:text-[3.333vw]">
        {t(
          "footer_the_charges_on_your_credit_card_statement_will_appear_as_devsect",
        )}
      </p>
      <p className="mb-[10px] text-center text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D] sm:text-[3.333vw]">
        {t(
          "footer_without_cancellation_before_the_selected_plan_ends_i_accept_that_aigo",
        )}
        {t("footer_will_automatically_charge_usd")}{" "}
        {`${currentPlan?.amount_initial}`} {t("footer_every")}{" "}
        {`${currentPlan?.interval_length}`} {`${currentPlan?.interval_unit}`}{" "}
        {t(
          "footer_until_i_cancel_cancel_online_via_the_account_page_on_the_app",
        )}
      </p>
      <div className="pb-[0.6px] pt-[0.6vw] sm:pt-[3.5]">
        <div className="mx-auto max-w-[330px]">
          <div className="mb-[1.25vw] flex justify-center gap-[1vw] sm:mb-[3.89vw] sm:gap-[2.22vw]">
            <div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
              <Image
                src={ImageMastercard.src}
                width={ImageMastercard.width}
                height={ImageMastercard.height}
                alt="Image Mastercard"
                className="sm:h-[5.28vw] sm:w-[14.72vw]"
              />
            </div>
            <div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
              <Image
                src={ImageVisa.src}
                width={ImageVisa.width}
                height={ImageVisa.height}
                alt="Image Stripe"
                className="sm:h-[5.28vw] sm:w-[14.72vw]"
              />
            </div>
            <div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
              <Image
                src={ImageStripe.src}
                width={ImageStripe.width}
                height={ImageStripe.height}
                alt="Image Stripe"
                className="sm:h-[5.28vw] sm:w-[14.72vw]"
              />
            </div>
            <div className="flex h-[2.5vw] w-[4.5vw] items-center justify-center overflow-hidden rounded-[0.4vw] border-[1px] border-[#D9D9D9] bg-[#fff] sm:h-[10.83vw] sm:w-[16.11vw] sm:rounded-[2.78vw]">
              <Image
                src={ImageMc.src}
                width={ImageMc.width}
                height={ImageMc.height}
                alt="Image Stripe"
                className="sm:h-[3.33vw] sm:w-[11.11vw]"
              />
            </div>
          </div>
          <p className="mb-[8px] text-[12px] leading-[1.2em] text-[#6D6D6D] sm:mb-[2vw] sm:text-[3.333vw]">
            {t("footer_devsect_fze_llc_blb_bc5_840")} <br />
            {t("footer_amc_boulevard_b_building_ajman_united_arab_emirates")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[5px] text-[14px] font-medium sm:text-[3.889vw]">
        <Link
          className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
          href="https://app.theaigo.com/terms"
        >
          {t("footer_terms_of_use")}
        </Link>
        <Link
          className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
          href="https://app.theaigo.com/privacy"
        >
          {t("footer_privacy")}
        </Link>
        <Link
          className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
          href="https://app.theaigo.com/cancellation"
        >
          {t("footer_cancellation_policy")}
        </Link>
      </div>
    </div>
  );
};

export default SectionFooter;
