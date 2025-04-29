"use client";
import React, { useEffect, useState, useTransition } from "react";
import Image, { StaticImageData } from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
// import ImageModal from "@/../public/images/img/image-modal.webp";
import ImageModalBuyTokens from "@/../public/images/img/image-buy-tokens.png"
import { usePaymentStore } from "@/app/shared/store/paymentStore";
import ImageDecor1 from "@/../public/images/icons/payment/icon-decor1.png";
// import SectionWithSwiper from "@/app/flat-pages/Initpage/components/SectionWithSwiper";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import IcnCoins from "@/../public/images/icons/icon-coins.svg";
import { getTokenPackageInfo } from "@/app/shared/api/payment";
import { useParams, useRouter } from "next/navigation";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import { StrictTokenPackage } from "@/app/shared/api/types/payment";
import TokenPackages from "@/app/widgets/TokenPackages";
import TokenPackagesSkeleton from "@/app/widgets/TokenPackages/TokenPackagesSkeleton";
import { PreparedAvatar } from "@/app/shared/api/types";
import clsx from "clsx";
import { useAuthStore } from "@/app/shared/store/authStore";
import notification from "@/app/widgets/Notification";
import Spinner from "@/app/widgets/Spinner";
import TokensPayForm from './TokensPayForm';
import TokenCosts from './TokenCosts';
import TokenAdvantages from './TokenAdvantages';
import SectionFooter from '@/app/flat-pages/Initpage/components/SectionFooter';
import Link from "next/link";
import ImageMastercard from "@/../public/images//icons/payment/1.png";
import ImageVisa from "@/../public/images/icons/payment/2.png";
import ImageStripe from "@/../public/images/icons/payment/3.svg";
import ImageMc from "@/../public/images/icons/payment/4.svg";



const TokensModal = () => {
  const { characters, selectedCharacterId, setSelectedCharacterId } = useSelectedCardStore();
  const params = useParams();
  const navigate = useRouter();
  const { isTokensModalActive, setTokensModal, tokens } = usePaymentStore();
  const { user } = useAuthStore();
  const [tokenPackages, setTokenPackages] = useState<
    StrictTokenPackage[] | null
  >();
  const [characterImage, setCharacterImage] = useState("");
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

  useEffect(() => {
    getTokenPackages();
    // if (params?.id && characters) {
    //   console.log(characterId)
    //   const characterId = Number(params.id);
    //   if (!isNaN(characterId)) {
    //     const currentCharacter = characters.find(
    //       (item: PreparedAvatar) =>
    //         item.id !== undefined && Number(item.id) === characterId,
    //     );
    //     console.log(currentCharacter)
    //     setCharacterImage(currentCharacter?.image ?? "");
    //   }
    // }

    
    if (Array.isArray(characters) && characters.length > 0) {
      const firstCharacter = characters[0];
      setSelectedCharacterId(firstCharacter.id)
      console.log(selectedCharacterId)
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
        fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${packageName}&user_id=${user.uid}&email=${user?.email}`
      } else {
        fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/tokens_purchase?name=${packageName}&user_id=${user.uid}&email=${user?.email}&character_id=${selectedCharacterId}`
      }
      
      if (fullUrl) {
        console.log(fullUrl)
        setFullUrl(fullUrl)
      }
    }


  }, [selectedPackage, user, params?.id])


  // useEffect(() => {
  //   setIframe("")
  // }, [packageName])

  // const fullUrl = "https://stage-payments.theaigo.com:8000/tokens_purchase?name=1100_tokens&user_id=kqRBW7kADSOkTpClwkMK4nqWHdA3&email=lancecnc1@gmail.com&character_id=character_id=constructor_0680f42e-0cb5-7128-8000-cbcc7da3857d"

  // const image = characterImage ? characterImage : ImageModalBuyTokens.src;

  return (
    <Dialog
      open={isTokensModalActive}
      as="div"
      className="relative z-[50] focus:outline-none"
      onClose={() => setTokensModal(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-lato">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full h-screen flex items-center justify-center bg-[#121423] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="w-screen h-full flex items-center justify-center flex-col ">
              <div className="w-full h-[550px] mx-auto relative sm:overflow-x-hidden sm:bg-[#121423] sm:size-full">
                <div className="hidden relative w-full h-[400px] sm:block success-payment-bg">
                  <Image
                    src={ImageModalBuyTokens.src}
                    fill
                    alt="image modal"
                    className="object-cover"
                  />
                </div>
                <div className="relative sm:static">
                  {/* <button
                    onClick={() => setTokensModal(false)}
                    className="absolute z-[10] right-[20px] flex items-center justify-center top-[20px] bg-[#191B2C] rounded-[12px] size-[32px] sm:right-auto sm:left-[20px] sm:top-[20px]"
                  >
                    <Image
                      src={IconClose.src}
                      width={IconClose.width}
                      height={IconClose.height}
                      alt="icon close"
                    />
                  </button> */}
                  <div className="flex items-center justify-center">
                    <p className="sm:hidden font-bai-jamjuree mb-[27px] block font-semibold text-[34px]">Buy tokens</p>
                  </div> 
                  <div className="sm:flex sm:flex-col sm:px-[16px] bg-[#121423] rounded-[24px] overflow-hidden grid grid-cols-3 px-[72px] gap-[16px] sm:overflow-visible sm:h-auto">
                    <div className="sm:hidden">
                      <Image
                        src={ImageModalBuyTokens.src}
                        width={ImageModalBuyTokens.width}
                        height={ImageModalBuyTokens.height}
                        alt="image modal"
                        className="object-cover justify-self-end"
                      />
                    </div>
                    <div className="w-full   sm:relative sm:z-[5] sm:flex sm:flex-col sm:items-center sm:mt-[-200px] sm:justify-center sm:h-full">
                      <div className="hidden sm:block font-bai-jamjuree mb-[14px] pb-[24px] space-y-[8px] sm:w-full sm:space-y-[2.13vw]">
                        <div className="mb-[16px] space-y-[12px]">
                          <div className='sm:px-0 px-[16px]'>
                            <p className="leading-[1.3] font-semibold text-[24px]">
                              <span>Buy tokens</span>
                            </p>
                            <p className="text-[16px] max-w-[80%] font-medium">
                              Enjoy a special package discount available only now!
                            </p>
                          </div>
                        </div>
                      </div>
                      
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
                          {/*<SectionWithSwiper className="!h-[166px] fm:!h-[55.87vw] !rounded-[12px]" slidesPerView={2.2} images={selectedCard?.listImage ?? null} />*/}
                        </div>
                        <button
                          onClick={() => {}}
                          disabled={(!tokenPackages && loading)}
                          className="main-gradient mb-[8px] flex items-center justify-center gap-[5px] overflow-hidden w-full h-[60px] rounded-[24px] disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <span className="relative z-[5] text-[15px] font-bold">
                            Buy tokens
                          </span>
                          <span className="bg-white-gradient animate-[moveRight_4.25s_ease-in_infinite_forwards] block rotate-[20deg] size-[125px] absolute -left-1/2 top-1/2 -translate-y-1/2" />
                        </button>
                        <div className="text-center mb-[20px]">
                          <span className="font-bai-jamjuree text-[12px] font-bold">🔥 100,756 tokens sold today 🔥</span>
                        </div>
                        
                        {fullUrl && <TokensPayForm fullUrl={fullUrl} />}
                      </div>
                           <div className="sm:hidden block text-center overflow-hidden font-bai-jamjuree mx-auto pt-[20px] pb-[10px] sm:pb-[2.778vw] sm:max-w-[91vw] sm:pt-[5.56vw]">
      <div className=" flex items-center gap-[10px] mb-[15px]">
        <input
          type="checkbox"
          defaultChecked
          name="ssd"
          className={clsx(
            'shrink-0 border border-[#8E59FF] before:!rounded-[5px] rounded-[8px] size-[26px] cursor-pointer appearance-none border-[#5E56E7] bg-transparent checked:bg-[url("/images/icons/payment/check.svg")] bg-[3px] bg-center bg-no-repeat',
            {},
          )}
        />
        <p className="text-left text-[#6D6D6D] leading-[1.2em] font-medium text-[12px] tracking-[-0.04em]">
          By completing this transaction you certify that you are 18 years or
          older and agree to our
          <span className="!inline bg-button-gradient bg-clip-text text-transparent text-gradient">
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
                    </div>
                    <div className="rounded-[32px] h-fit sm:w-full w-[365px] bg-[#191B2C] p-[16px]">
                      <TokenAdvantages />
                      <TokenCosts />
                    </div>
                    <div className="sm:block hidden text-center overflow-hidden font-bai-jamjuree mx-auto pt-[20px] pb-[10px] sm:pb-[2.778vw] sm:max-w-[91vw] sm:pt-[5.56vw]">
      <div className=" flex items-center gap-[10px] mb-[15px]">
        <input
          type="checkbox"
          defaultChecked
          name="ssd"
          className={clsx(
            'shrink-0 border border-[#8E59FF] before:!rounded-[5px] rounded-[8px] size-[26px] cursor-pointer appearance-none border-[#5E56E7] bg-transparent checked:bg-[url("/images/icons/payment/check.svg")] bg-[3px] bg-center bg-no-repeat',
            {},
          )}
        />
        <p className="text-left text-[#6D6D6D] leading-[1.2em] font-medium text-[12px] tracking-[-0.04em]">
          By completing this transaction you certify that you are 18 years or
          older and agree to our
          <span className="!inline bg-button-gradient bg-clip-text text-transparent text-gradient">
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

export default TokensModal;
