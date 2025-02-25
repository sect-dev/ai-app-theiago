'use client'
import React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react'
import {useSelectedCardStore} from "@/app/shared/store/publicStore";
import Login from "@/app/widgets/Modals/AuthModal/Login";
import Register from "@/app/widgets/Modals/AuthModal/Register";

const AuthModal = () => {
  const {isAuthModalActive, modalType, setAuthModal} = useSelectedCardStore()

  const renderContent = () => {
    switch (modalType) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
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
            className="w-full bg-[rgba(0,0,0,0.6)] backdrop-blur-[7px] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div>
              {renderContent()}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthModal;