import Image from "next/image";
import IconSecure from "@/../public/images/icons/icon-payment-secure-shield.svg";
import IconMoneySafe from "@/../public/images/img/image-money-safe.png";
import ImageSecureBlue from "@/../public/images/img/image-secure-blue.png";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface Props {
  isOrganic?: boolean;
}

const SafePayment = (props: Props) => {
  const { isOrganic } = props;
  const t = useTranslations("Paywall");

  return (
    <div
      className={clsx(
        "relative mb-[16px] rounded-[32px] p-[20px] shadow-purple-safe-payment-shadow",
        isOrganic ? "bg-main-gradient" : "bg-multi-purple-gradient",
      )}
    >
      <div className="mb-[10px] flex max-w-fit gap-[4px] rounded-[18px] bg-[#2B2D44] p-[7px]">
        <Image
          src={IconSecure.src}
          alt="icon secure"
          width={IconSecure.width}
          height={IconSecure.height}
        />
        <span className="text-[14px] font-semibold text-[#0CFF71]">
          {t("safe_payment")}
        </span>
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="text-[24px] font-bold leading-[120%]">
          {t("money_back")} <br /> {t("guarantee")}
        </span>
        <span className="font-meduim max-w-[250px] text-[14px] leading-[130%] tracking-[0] text-white opacity-80">
          {t(
            "we_are_confident_our_premium_experience_will_exceed_your_expectations",
          )}
        </span>
      </div>
      <Image
        src={isOrganic ? ImageSecureBlue.src : IconMoneySafe.src}
        alt="icon money safe"
        width={IconMoneySafe.width}
        height={IconMoneySafe.height}
        className="absolute right-0 top-0"
      />
    </div>
  );
};

export default SafePayment;
