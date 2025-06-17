import Image from "next/image";
import IconSecure from "@/../public/images/icons/icon-payment-secure-shield.svg";
import IconMoneySafe from "@/../public/images/img/image-money-safe.png";
import ImageSecureBlue from "@/../public/images/img/image-secure-blue.png";
import clsx from "clsx";

interface Props {
  isOrganic?: boolean;
}

const SafePayment = (props: Props) => {
  const { isOrganic } = props;

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
          Safe payment
        </span>
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="text-[24px] font-bold leading-[120%]">
          Money Back <br /> Guarantee
        </span>
        <span className="font-meduim max-w-[250px] text-[14px] leading-[130%] tracking-[0] text-white opacity-80">
          We’re confident our premium experience will exceed your expectations.
          If you’re not fully satisfied, you can apply for a refund to ensure
          peace of mind. Enjoy exploring everything we offer, risk-free—your
          satisfaction is our top priority.
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
