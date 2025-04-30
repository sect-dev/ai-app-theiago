import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import ImageModal from "@/../public/images/img/image-modal.webp";
import IconCamera from "@/../public/images/icons/icon-camera.svg";
import ImageQr from "@/../public/images/img/image-qr.svg";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";

const QrModal = () => {
  const { isQrModalActive, setQrModal } = useSelectedCardStore();

  return (
    <Dialog
      open={isQrModalActive}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setQrModal(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-lato">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="w-screen h-full flex items-center flex-col justify-center sm:pt-[80px]">
              <div className="relative flex w-[690px] justify-between rounded-[24px] overflow-hidden md:w-[590px] sm:overflow-visible sm:w-[88vw]">
                <button
                  onClick={() => setQrModal(false)}
                  className="absolute z-[10] right-[20px] flex items-center justify-center top-[20px] bg-[#191B2C] rounded-[12px] size-[32px] sm:top-[-50px]"
                >
                  <Image
                    src={IconClose.src}
                    width={IconClose.width}
                    height={IconClose.height}
                    alt="icon close"
                  />
                </button>
                <div className="w-full bg-[#121423] space-y-[16px] p-[20px] sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-full">
                  <div className="space-y-[12px]">
                    <p className="text-[20px] font-semibold">
                      Get the App for full experience!
                    </p>
                    <p className="text-[16px font-medium]">
                      Download the AiGo app and your girls will be in your
                      pocket!
                    </p>
                  </div>
                  <div className="size-[308px] rounded-[32px] p-[26px] sm:size-[250px] bg-white">
                    <div className="relative size-[254px] sm:size-[200px]">
                      <Image src={ImageQr.src} fill alt="qr code image" />
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px] bg-[#282B42] rounded-[24px] py-[12px] px-[16px]">
                    <Image
                      src={IconCamera.src}
                      width={IconCamera.width}
                      height={IconCamera.height}
                      alt="icon camera"
                    />
                    <p>
                      Scan the code with your phone&apos;s camera to download!
                    </p>
                  </div>
                </div>
                <div className="w-full h-hull relative sm:hidden">
                  <Image
                    src={ImageModal.src}
                    fill
                    alt="image modal"
                    className="object-cover"
                  />
                  <Link
                    href="/"
                    className="font-bold block text-[34px] tracking-[0.04em] sm:text-[5.33vw] absolute left-[20px] bottom-[20px]"
                  >
                    <span className="logo-gradient ">Ai</span>
                    <span className="">Go</span>
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default QrModal;
