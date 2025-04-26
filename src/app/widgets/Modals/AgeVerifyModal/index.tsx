import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import ImageAgeConfirmation from "@/../public/images/img/ageconfirmation.png";

interface AgeVerifyModalProps {
  onConfirm: () => void;
  onDecline: () => void;
}

const AgeVerifyModal = (props: AgeVerifyModalProps) => {
  const { onConfirm, onDecline } = props;

  return (
    <Dialog
      open={true}
      onClose={() => {}}
      className="relative z-50 font-bai-jamjuree"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel
          transition
          className="w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
          <div className="flex items-center justify-center flex-col ">
            <div className="w-[328px] h-[432px] gap-[24px] flex items-center justify-center flex-col mx-auto relative bg-[#121423] p-[20px] rounded-3xl">
              <div>
                <Image
                  src={ImageAgeConfirmation.src}
                  width={ImageAgeConfirmation.width}
                  height={ImageAgeConfirmation.height}
                  alt="image modal"
                  className="object-cover"
                />
              </div>
              <div className="text-center gap-[12px]">
                <span className="block font-semibold text-[24px]">
                  Confirm your age
                </span>
                <span className="block font-medium text-[16px]">
                  We require users to be 18 years old or over, so please confirm
                  your age. If you are younger, please leave the site
                </span>
              </div>

              <div className="flex w-full flex-col gap-2">
                <button
                  onClick={onConfirm}
                  className="px-4 text-[15px] font-bold text-white py-2 main-gradient rounded-xl"
                >
                  <span className="relative z-[5]">I am 18 or over</span>
                </button>
                <button
                  onClick={onDecline}
                  className="px-4 text-[15px] font-bold py-2 bg-blue-500 text-white rounded-xl bg-[#21233A] shrink-0 transition-bg duration-300 hover:bg-[#2E335B]"
                >
                  I am under 18
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AgeVerifyModal;
