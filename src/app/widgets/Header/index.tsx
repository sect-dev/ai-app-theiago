'use client'
import React, { useState } from 'react';
import Link from "next/link";
import clsx from "clsx";
import { useSelectedCardStore } from "@/app/shared/store/publicStore";
import { useAuthStore } from "@/app/shared/store/authStore";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const Header = () => {
  const { user, loading } = useAuthStore();
  const [menuModal, setMenuModal] = useState(false);
  const { setAuthModal } = useSelectedCardStore();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка выхода из системы:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full py-[6px] md:py-[14px] md:static">
      <div className="container">
        <div className="flex justify-between items-center font-bai-jamjuree">
          <div className="flex items-center gap-[14px]">
            <button
              onClick={() => setMenuModal(!menuModal)}
              className="flex-col h-[12px] w-[18px] gap-[4px] hidden md:flex"
            >
              <span className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-transform duration-300', {
                'origin-[2px] rotate-[45deg] sm:origin-[0.356vw]': menuModal,
              })} />
              <span className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-opacity duration-300', {
                'opacity-0': menuModal,
              })} />
              <span className={clsx('block h-[2px] w-full rounded-[5px] bg-white transition-transform duration-300', {
                'origin-[1px] rotate-[-45deg] sm:origin-[0.565vw]': menuModal,
              })} />
            </button>
            <Link href="/" className="font-bold block text-[20px] tracking-[0.04em] sm:text-[5.33vw] ">
              <span className="logo-gradient">Ai</span>
              <span>Go</span>
            </Link>
          </div>

          {loading ? <div className="animate-pulse block main-gradient h-[24px] w-[72px] flex items-center rounded-[15px] " /> : !user?.isAnonymous ? (
            <button
              onClick={handleSignOut}
              className="animate-fadeIn relative gradient-border logo-gradient flex items-center justify-center gap-[8px] w-[64px] h-[24px]"
            >
              <span className="shrink-0 text-[12px] font-semibold">Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => setAuthModal({ modalType: "login", isAuthModalActive: true })}
              className="animate-fadeIn main-gradient px-[12px] h-[24px] font-bold text-[12px] rounded-[8px] md:px-[12px] md:h-[27px] md:text-[14px]"
            >
              <span className="relative z-[5]">Sign in</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
