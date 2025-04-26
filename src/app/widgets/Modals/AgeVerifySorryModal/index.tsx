import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import ImageAgeConfirmation from "@/../public/images/img/ageconfirmation.png";
import Link from "next/link";

const AgeVerifySorryModal = () => {
  return (
    <Dialog
      open={true}
      onClose={() => {}}
      className="relative z-50 font-bai-jamjuree"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel
          transition
          className="w-full h-screen flex items-center justify-center bg-black"
        >
          <div className="flex items-center justify-center flex-col">
            <div className="w-[328px] h-[368px] flex items-center justify-center flex-col relative bg-[#121423] p-[20px] rounded-3xl">
              <div>
                <Image
                  src={ImageAgeConfirmation.src}
                  width={ImageAgeConfirmation.width}
                  height={ImageAgeConfirmation.height}
                  alt="image modal"
                  className="object-cover mb-[24px]"
                />
              </div>
              <div className="text-center mb-[24px]">
                <span className="block font-semibold text-[24px] text-center leading-[28px] tracking-normal mb-[12px]">
                  Sorry, please come
                  <br />
                  back later
                </span>
                <span className="block font-medium text-[16px]">
                  This website can only be used by those who are 18 years or
                  older
                </span>
              </div>

              <div className="flex w-full text-[12px] gap-[8px] font-normal justify-center">
                <span className="">Do you consider this an error?</span>
                <Link href="mailto:support@theaigo.com" prefetch={false}>
                  <span className="logo-gradient transition-text duration-300 hover:text-white">
                    Contact us
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AgeVerifySorryModal;
