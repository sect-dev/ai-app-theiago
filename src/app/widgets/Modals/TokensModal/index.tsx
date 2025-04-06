import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Dialog, DialogPanel} from "@headlessui/react";
import ImageModal from "@/../public/images/img/image-modal.webp";
import {usePaymentStore} from "@/app/shared/store/paymentStore";
import ImageDecor1 from "@/../public/images/icons/payment/icon-decor1.png";
// import SectionWithSwiper from "@/app/flat-pages/Initpage/components/SectionWithSwiper";
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import IcnCoins from "@/../public/images/icons/icon-coins.svg";
import {getTokenPackageInfo} from "@/app/shared/api/payment";
import {useParams} from "next/navigation";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import {StrictTokenPackage} from "@/app/shared/api/types/payment";
import TokenPackages from "@/app/widgets/TokenPackages";
import TokenPackagesSkeleton from "@/app/widgets/TokenPackages/TokenPackagesSkeleton";
import {PreparedAvatar} from "@/app/shared/api/types";
import clsx from "clsx";

const TokensModal = () => {
  const params = useParams()
  const { isTokensModalActive, setTokensModal, tokens} = usePaymentStore()
  const [tokenPackages, setTokenPackages] = useState<StrictTokenPackage[] | null>()
  const [characterImage, setCharacterImage] = useState('')
  const {characters} = useSelectedCardStore()
  const [loading,setLoading] = useState(false)

  const getTokenPackages = async () => {
    setLoading(true)
    try {
      const resp = await getTokenPackageInfo()
      if(resp) {
        return setTokenPackages(resp)
      }
    } catch(error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  console.log('tokenPackages',tokenPackages)
  useEffect(() => {
    getTokenPackages()
    if (params?.id && characters) {
      const characterId = Number(params.id);
      if (!isNaN(characterId)) {
        const currentCharacter = characters.find((item: PreparedAvatar) =>
          item.id !== undefined && Number(item.id) === characterId
        );
        setCharacterImage(currentCharacter?.image ?? '');
      }
    }
  }, [])

  const image = characterImage ? characterImage : ImageModal.src
  return (
    <Dialog open={isTokensModalActive} as="div" className="relative z-[50] focus:outline-none" onClose={() => setTokensModal(false)}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-lato">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="w-screen h-full flex items-center justify-center flex-col pt-[45px] sm:pt-0">
              <div className="w-[690px] h-[550px] mx-auto relative sm:overflow-hidden sm:bg-[#121423] sm:size-full">
                <div className="hidden relative w-full h-[400px] sm:block success-payment-bg">
                  <Image
                    src={image}
                    fill
                    alt="image modal"
                    className="object-cover"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setTokensModal(false)}
                    className="absolute z-[10] right-[20px] flex items-center justify-center top-[20px] bg-[#191B2C] rounded-[12px] size-[32px] sm:top-[-50px]"
                  >
                    <Image
                      src={IconClose.src}
                      width={IconClose.width}
                      height={IconClose.height}
                      alt="icon close"
                    />
                  </button>
                  <div className="flex justify-between bg-[#121423] rounded-[24px] overflow-hidden  sm:overflow-visible sm:h-auto">
                    <Image
                      src={ImageDecor1.src}
                      width={ImageDecor1.width}
                      height={ImageDecor1.height}
                      alt="icon"
                      className="absolute left-[-50px] top-[-50px] z-[10]"
                    />
                    <div className="w-full h-hull relative sm:hidden">
                      <Image
                        src={image}
                        fill
                        alt="image modal"
                        className="object-cover"
                      />
                      <p className="font-semibold font-bai-jamjuree block leading-[1.2em] text-[20px] max-w-[70%] tracking-[0.01em] sm:text-[5.33vw] absolute left-[20px] bottom-[20px]">
                        She is already miss you
                      </p>
                    </div>
                    <div className="w-full  p-[20px] sm:relative sm:z-[5] sm:flex sm:flex-col sm:items-center sm:mt-[-200px] sm:justify-center sm:h-full">
                      <div className="font-bai-jamjuree mb-[24px] pb-[24px] border-b border-b-[#3A3F63] space-y-[8px] sm:w-full sm:space-y-[2.13vw]">
                        <div className="mb-[16px] space-y-[12px]">
                          <div className={clsx("flex text-[12px] rounded-[12px] w-fit font-bold px-[12px] h-[24px] bg-main-gradient font-bai-jamjuree items-center gap-[4px]",{
                            "!bg-light-red-gradient": tokens === 0
                          })}>
                            {tokens}
                            <Image
                              src={IcnCoins.src}
                              width={IcnCoins.width}
                              height={IcnCoins.height}
                              alt="coins image"
                            />
                          </div>
                          <p className="leading-[1.2em] font-semibold text-[20px] sm:text-[5.33vw]">
                            {tokens === 0
                              ? <span>You’re out of tokens!</span>
                              : <span>You’re running out of tokens</span>
                            }
                          </p>
                          <p className="text-[#B5B5B5] text-[16px] max-w-[80%]  font-medium sm:text-[4.27vw]">You can purchase tokens here to continue</p>
                        </div>
                        <ul className="space-y-[8px] font-medium tracking-[-0,04em] sm:space-y-[2.13vw]">
                          <li>🔥 Photos and video content</li>
                          <li>👧 Dialogues like a real girls</li>
                          <li>💕 The full experience of a relationship</li>
                          <li>⭐ No annoying ads</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-[#B5B5B5] font-medium text-[16px]">Choose package</p>
                        <div className="pt-[12px] mb-[24px] max-w-[300px]">
                          {(tokenPackages && !loading)
                            ? <TokenPackages tokenPackages={tokenPackages} />
                            : <TokenPackagesSkeleton />
                          }
                          {/*<SectionWithSwiper className="!h-[166px] fm:!h-[55.87vw] !rounded-[12px]" slidesPerView={2.2} images={selectedCard?.listImage ?? null} />*/}
                        </div>
                        <button
                          // onClick={handleStartChat}
                          className="main-gradient w-full text-[15px] h-[60px] rounded-[24px]"
                        >
                          <span className="relative z-[5]">Buy tokens</span>
                        </button>
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