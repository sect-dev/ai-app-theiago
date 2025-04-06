import React from 'react';
import Image from "next/image";
import {Dialog, DialogPanel} from "@headlessui/react";
import {usePaymentStore} from "@/app/shared/store/paymentStore";
import ImageModal from "@/../public/images/img/image-modal.webp";
import SuccessPayment from "@/app/widgets/Modals/SuccessPaymentModal/SuccessPayment";
import SuccessAuth from "@/app/widgets/Modals/SuccessPaymentModal/SuccessAuth";

const SuccessPaymentModal = () => {
  const {isSuccessPaymentModalActive, successPaymentModalType, setSuccessPaymentModal} = usePaymentStore()

  const renderContent = () => {
    switch (successPaymentModalType){
      case 'subscription_success':
        return <SuccessPayment />
      case 'auth_success':
        return <SuccessAuth />
      default:
        return <SuccessPayment />
    }
  }

  return (
    <Dialog open={isSuccessPaymentModalActive} as="div" className="relative z-[50] focus:outline-none" onClose={() => setSuccessPaymentModal({isSuccessPaymentModalActive:false,successPaymentModalType: null})}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-lato">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.8)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="w-screen h-full flex items-center justify-center flex-col pt-[45px] sm:pt-0">
              <div className="w-[690px] h-[550px] mx-auto relative sm:overflow-x-hidden sm:bg-[#121423] sm:size-full">
                <div className="hidden relative w-full h-[400px] sm:block success-payment-bg">
                  <Image
                    src={ImageModal.src}
                    fill
                    alt="image modal"
                    className="object-cover"
                  />
                </div>
                {renderContent()}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );

};

export default SuccessPaymentModal;