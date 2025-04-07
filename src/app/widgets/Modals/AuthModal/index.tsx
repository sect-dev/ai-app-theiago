'use client'
import React from 'react';
import Image from "next/image";
import { Dialog, DialogPanel } from '@headlessui/react'
import Login from "@/app/widgets/Modals/AuthModal/Login";
import Register from "@/app/widgets/Modals/AuthModal/Register";
import IconClose from "@/../public/images/icons/icon-modal-close.svg";
import ForgotPassword from "@/app/widgets/Modals/AuthModal/ForgotPassword";
import {useAuthStore} from "@/app/shared/store/authStore";

const AuthModal = () => {
  const {isAuthModalActive, modalType, setAuthModal} = useAuthStore()

  const renderContent = () => {
    switch (modalType) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'forgotPass':
        return <ForgotPassword />;
      default:
        return <Login />;
    }
  };

  return (
    <Dialog open={isAuthModalActive} as="div" className="relative z-10 focus:outline-none" onClose={() => setAuthModal({ modalType: null, isAuthModalActive: false })}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-lato">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-[5px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="w-[690px] h-[550px] mx-auto relative sm:size-full">
              <button
                onClick={() => setAuthModal({ modalType: null, isAuthModalActive: false })}
                className="absolute z-[10] right-[20px] flex items-center justify-center top-[20px] bg-[#191B2C] rounded-[12px] size-[32px] sm:top-[70px] sm:right-auto sm:left-[20px]"
              >
                <Image
                  src={IconClose.src}
                  width={IconClose.width}
                  height={IconClose.height}
                  alt="icon close"
                />
              </button>
              {renderContent()}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthModal;