import Image from "next/image";
import Link from "next/link";
import ImageMastercard from "@/../public/images//icons/payment/1.png";
import ImageVisa from "@/../public/images/icons/payment/2.png";
import ImageStripe from "@/../public/images/icons/payment/3.svg";
import ImageMc from "@/../public/images/icons/payment/4.svg";
import clsx from "clsx";

interface FooterProps {
  className: string;
}

const SectionFooter = (props: FooterProps) => {
  const { className } = props;

  return (
    <div
      className={clsx(
        "mx-auto overflow-hidden pb-[10px] pt-[20px] text-center font-bai-jamjuree sm:max-w-[91vw] sm:pb-[2.778vw] sm:pt-[5.56vw]",
        className,
      )}
    >
      <div className="mb-[15px] flex items-center gap-[10px]">
        <input
          type="checkbox"
          defaultChecked
          name="ssd"
          className={clsx(
            'size-[26px] shrink-0 cursor-pointer appearance-none rounded-[8px] border border-[#049AEF] bg-transparent bg-[3px] bg-center bg-no-repeat before:!rounded-[5px] checked:bg-[url("/images/icons/payment/icon-blue-checked.svg")]',
            {},
          )}
        />
        <p className="text-left text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D]">
          By completing this transaction you certify that you are 18 years or
          older and agree to our
          <span className="text-gradient !inline bg-main-gradient bg-clip-text text-transparent">
            {" "}
            Privacy Policy, Terms of Use and Cacellation Policy
          </span>
        </p>
      </div>
      <p className="text-center text-[12px] font-medium leading-[1.2em] tracking-[-0.04em] text-[#6D6D6D] sm:text-[3.333vw]">
        The charges on your credit card statement will appear as DevSect
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
            DevSect FZE LLC BLB-BC5-840 <br /> AMC - BOULEVARD-B BUILDING,
            Ajman, United Arab Emirates
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[5px] text-[14px] font-medium sm:text-[3.889vw]">
        <Link
          className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
          href="https://app.theaigo.com/terms"
        >
          Terms of use
        </Link>
        <Link
          className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
          href="https://app.theaigo.com/privacy"
        >
          Privacy
        </Link>
        <Link
          className="border-b-[1px] border-b-transparent transition-all duration-300 hover:border-b-white"
          href="https://app.theaigo.com/cancellation"
        >
          Cancellation policy
        </Link>
      </div>
    </div>
  );
};

export default SectionFooter;
