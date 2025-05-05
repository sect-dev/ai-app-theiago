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
          className="flex h-screen w-full items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex h-[368px] w-[328px] flex-col items-center justify-center rounded-3xl bg-[#121423] p-[20px]">
              <div>
                <Image
                  src={ImageAgeConfirmation.src}
                  width={ImageAgeConfirmation.width}
                  height={ImageAgeConfirmation.height}
                  alt="image modal"
                  className="mb-[24px] object-cover"
                />
              </div>
              <div className="mb-[24px] text-center">
                <span className="mb-[12px] block text-center text-[24px] font-semibold leading-[28px] tracking-normal">
                  Sorry, please come
                  <br />
                  back later
                </span>
                <span className="block text-[16px] font-medium">
                  This website can only be used by those who are 18 years or
                  older
                </span>
              </div>

              <div className="flex w-full justify-center gap-[8px] text-[12px] font-normal">
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
