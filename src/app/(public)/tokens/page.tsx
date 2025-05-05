"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageModalBuyTokens from "@/../public/images/img/image-buy-tokens.png";
import ImageModalBuyTokensMobile from "@/../public/images/img/image-buy-tokens-mobile.png";
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { getTokenPackageInfo } from "@/app/shared/api/payment";
import { useParams, useRouter } from "next/navigation";
import { StrictTokenPackage } from "@/app/shared/api/types/payment";
import TokenPackages from "@/app/widgets/TokenPackages";
import TokenPackagesSkeleton from "@/app/widgets/TokenPackages/TokenPackagesSkeleton";
import clsx from "clsx";
import { useAuthStore } from "@/app/shared/store/authStore";
import TokensPayForm from "@/app/widgets/TokensPage/TokensPayForm";
import TokenCosts from "@/app/widgets/TokensPage/TokenCosts";
import TokenAdvantages from "@/app/widgets/TokensPage/TokenAdvantages";
import Link from "next/link";
import ImageMastercard from "@/../public/images//icons/payment/1.png";
import ImageVisa from "@/../public/images/icons/payment/2.png";
import ImageStripe from "@/../public/images/icons/payment/3.svg";
import ImageMc from "@/../public/images/icons/payment/4.svg";
import PaymentDiscountBanner from "@/app/widgets/Payment/PaymentDiscountBanner";

const Page = () => {
  const { characters, selectedCharacterId, setSelectedCharacterId } =
    useSelectedCardStore();
  const params = useParams();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthStore();
  const [tokenPackages, setTokenPackages] = useState<
    StrictTokenPackage[] | null
  >();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [fullUrl, setFullUrl] = useState<string | null>(null);

  const getTokenPackages = async () => {
    setLoading(true);
    try {
      const resp = await getTokenPackageInfo();
      if (resp) {
        setSelectedPackage(resp[1].description);
        return setTokenPackages(resp);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth", // Плавная прокрутка
        block: "start", // Выравнивание по верхнему краю
      });
    }
  };

  useEffect(() => {
    getTokenPackages();

    if (Array.isArray(characters) && characters.length > 0) {
      const firstCharacter = characters[0];
      setSelectedCharacterId(firstCharacter.id);
    }
  }, []);

  // TODO: переписать на URLParams
  useEffect(() => {
    if (!selectedPackage || !user) return;

    const packageName = selectedPackage.split(" ").join("_");
    const apiBase = process.env.NEXT_PUBLIC_API_URL;

    if (apiBase) {
      let fullUrl;

      if (selectedCharacterId === null) {
        fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${packageName}&user_id=${user.uid}&email=${user?.email}`;
      } else {
        fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${packageName}&user_id=${user.uid}&email=${user?.email}&character_id=${selectedCharacterId}`;
      }

      if (fullUrl) {
        setFullUrl(fullUrl);
      }
    }
  }, [selectedPackage, user, params?.id]);

  return (
    <>
      <div className="block sm:hidden">
        <PaymentDiscountBanner />
      </div>
      <div className="bg-[#121423]">
        <div className="flex items-center justify-center">
          <p className="mb-[27px] mt-[24px] block font-bai-jamjuree text-[34px] font-semibold sm:hidden">
            Buy tokens
          </p>
        </div>
        <div className="relative hidden sm:block">
          <Image
            src={ImageModalBuyTokensMobile.src}
            width={ImageModalBuyTokensMobile.width}
            height={ImageModalBuyTokensMobile.height}
            alt="image modal"
            className="object-cover"
          />
          <div className="absolute bottom-0 left-[16px] grid grid-rows-2">
            <span className="leading-1.3 text-[24px] font-semibold">
              Buy tokens
            </span>
            <span className="leading-1 text-[16px] font-medium">
              Enjoy a special package discount
              <br />
              available only now!
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[16px] overflow-visible px-[20px] sm:flex sm:h-auto sm:flex-col sm:overflow-visible">
          <div className="sm:hidden">
            <Image
              src={ImageModalBuyTokens.src}
              width={ImageModalBuyTokens.width}
              height={ImageModalBuyTokens.height}
              alt="image modal"
              className="justify-self-end object-cover"
            />
          </div>
          <div>
            <div className="mb-[8px] w-full rounded-[32px] bg-[#191B2C] px-[16px] py-[32px] sm:mb-[0px] sm:bg-inherit sm:px-0">
              <div className="mt-[-10px]">
                {tokenPackages && !loading ? (
                  <TokenPackages
                    tokenPackages={tokenPackages}
                    setSelectedPackage={setSelectedPackage}
                    selectedPackage={selectedPackage}
                  />
                ) : (
                  <TokenPackagesSkeleton />
                )}
              </div>
              <div>
                <button
                  onClick={handleBuy}
                  disabled={!tokenPackages && loading}
                  className="main-gradient mb-[8px] flex h-[60px] w-full items-center justify-center gap-[5px] overflow-hidden rounded-[24px] disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="relative z-[5] text-[15px] font-bold">
                    Buy tokens
                  </span>
                  <span className="absolute -left-1/2 top-1/2 block size-[125px] -translate-y-1/2 rotate-[20deg] animate-[moveRight_4.25s_ease-in_infinite_forwards] bg-white-gradient" />
                </button>
                <div className="mb-[20px] text-center">
                  <span className="font-bai-jamjuree text-[12px] font-bold">
                    🔥 100,756 tokens sold today 🔥
                  </span>
                </div>
              </div>

              {fullUrl && <TokensPayForm ref={targetRef} fullUrl={fullUrl} />}
            </div>
            <Footer className="mb-[80px] block sm:hidden" />
          </div>
          <div>
            <div className="h-fit rounded-[32px] bg-[#191B2C] p-[16px] sm:w-full">
              <TokenAdvantages />
              <TokenCosts />
            </div>
            <Footer className="mb-[80px] hidden sm:block" />
          </div>
        </div>
      </div>
    </>
  );
};

interface FooterProps {
  className: string;
}

const Footer = (props: FooterProps) => {
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

export default Page;
