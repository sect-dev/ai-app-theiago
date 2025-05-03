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
import SectionFooter from "@/app/flat-pages/Initpage/components/SectionFooter";
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
      console.log(selectedCharacterId);
    }
  }, []);

  // const buyTokensHandler = async () => {
  //   try {
  //     const packageName = selectedPackage.split(" ").join("_");
  //     console.log(packageName)
  //     if ((user && !user?.email) || !user) {
  //       return notification.open({
  //         title: "Error",
  //         type: "error",
  //         description: "To buy tokens, you need to authorize",
  //       });
  //     }
  //     // const resp = await buyTokens(packageName, user.uid, user?.email ?? '')
  //     startTransition(() => {
  //       navigate.push(
  //         `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${packageName}&user_id=${user.uid}&email=${user?.email}&character_id=${selectedCharacterId}`,
  //       );
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        console.log(fullUrl);
        setFullUrl(fullUrl);
      }
    }
  }, [selectedPackage, user, params?.id]);

  return (
    <>
      <div className="sm:hidden block">
        <PaymentDiscountBanner />
      </div>
      <div className="bg-[#121423]">
        <div className="flex items-center justify-center">
          <p className="sm:hidden font-bai-jamjuree mb-[27px] mt-[24px] block font-semibold text-[34px]">
            Buy tokens
          </p>
        </div>
        <div className="sm:block hidden relative">
          <Image
            src={ImageModalBuyTokensMobile.src}
            width={ImageModalBuyTokensMobile.width}
            height={ImageModalBuyTokensMobile.height}
            alt="image modal"
            className="object-cover"
          />
          <div className="grid grid-rows-2 absolute bottom-0 left-[16px]">
            <span className="text-[24px] leading-1.3 font-semibold">
              Buy tokens
            </span>
            <span className="text-[16px] leading-1 font-medium">
              Enjoy a special package discount
              <br />
              available only now!
            </span>
          </div>
        </div>
        <div className="sm:flex sm:flex-col sm:overflow-visible sm:h-auto grid grid-cols-3 gap-[16px] overflow-visible px-[20px]">
          <div className="sm:hidden">
            <Image
              src={ImageModalBuyTokens.src}
              width={ImageModalBuyTokens.width}
              height={ImageModalBuyTokens.height}
              alt="image modal"
              className="object-cover justify-self-end"
            />
          </div>
          <div>
            <div className="w-full rounded-[32px] mb-[8px] sm:mb-[0px] sm:bg-inherit bg-[#191B2C] sm:px-0 px-[16px] py-[32px]">
              <div className="mt-[-10px] ">
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
                  className="main-gradient mb-[8px] flex items-center justify-center gap-[5px] overflow-hidden w-full h-[60px] rounded-[24px] disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span className="relative z-[5] text-[15px] font-bold">
                    Buy tokens
                  </span>
                  <span className="bg-white-gradient animate-[moveRight_4.25s_ease-in_infinite_forwards] block rotate-[20deg] size-[125px] absolute -left-1/2 top-1/2 -translate-y-1/2" />
                </button>
                <div className="text-center mb-[20px]">
                  <span className="font-bai-jamjuree text-[12px] font-bold">
                    🔥 100,756 tokens sold today 🔥
                  </span>
                </div>
              </div>

              {fullUrl && <TokensPayForm ref={targetRef} fullUrl={fullUrl} />}
            </div>
            <Footer className="sm:hidden block mb-[80px]" />
          </div>
          <div>
            <div className="rounded-[32px] h-fit sm:w-full bg-[#191B2C] p-[16px]">
              <TokenAdvantages />
              <TokenCosts />
            </div>
            <Footer className="sm:block hidden mb-[80px]" />
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
        "text-center overflow-hidden font-bai-jamjuree mx-auto pt-[20px] pb-[10px] sm:pb-[2.778vw] sm:max-w-[91vw] sm:pt-[5.56vw]",
        className,
      )}
    >
      <div className=" flex items-center gap-[10px] mb-[15px]">
        <input
          type="checkbox"
          defaultChecked
          name="ssd"
          className={clsx(
            'shrink-0 border border-[#049AEF] before:!rounded-[5px] rounded-[8px] size-[26px] cursor-pointer appearance-none bg-transparent checked:bg-[url("/images/icons/payment/icon-blue-checked.svg")] bg-[3px] bg-center bg-no-repeat',
            {},
          )}
        />
        <p className="text-left text-[#6D6D6D] leading-[1.2em] font-medium text-[12px] tracking-[-0.04em]">
          By completing this transaction you certify that you are 18 years or
          older and agree to our
          <span className="!inline bg-main-gradient bg-clip-text text-transparent text-gradient">
            {" "}
            Privacy Policy, Terms of Use and Cacellation Policy
          </span>
        </p>
      </div>
      <p className="text-center text-[#6D6D6D] text-[12px] font-medium tracking-[-0.04em] leading-[1.2em] sm:text-[3.333vw]">
        The charges on your credit card statement will appear as DevSect
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
            DevSect FZE LLC BLB-BC5-840 <br /> AMC - BOULEVARD-B BUILDING,
            Ajman, United Arab Emirates
          </p>
        </div>
      </div>

      <div className="flex items-center gap-[5px] justify-between font-medium text-[14px] sm:text-[3.889vw]">
        <Link
          className="transition-all duration-300 border-b-[1px] border-b-transparent hover:border-b-white"
          href="https://app.theaigo.com/terms"
        >
          Terms of use
        </Link>
        <Link
          className="transition-all duration-300 border-b-[1px] border-b-transparent hover:border-b-white"
          href="https://app.theaigo.com/privacy"
        >
          Privacy
        </Link>
        <Link
          className="transition-all duration-300 border-b-[1px] border-b-transparent hover:border-b-white"
          href="https://app.theaigo.com/cancellation"
        >
          Cancellation policy
        </Link>
      </div>
    </div>
  );
};

export default Page;
